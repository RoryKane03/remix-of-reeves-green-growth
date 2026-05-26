
-- 1) Make the quote-photos bucket private (no public reads by default)
update storage.buckets
set public = false
where name = 'quote-photos';

-- 2) Storage RLS policies for the quote-photos bucket
-- Allow anyone (including anonymous) to upload quote images
create policy "Anyone can upload quote images"
on storage.objects
for insert
to public
with check (bucket_id = 'quote-photos');

-- Only admins can read quote images
create policy "Admins can read quote images"
on storage.objects
for select
to authenticated
using (
  bucket_id = 'quote-photos'
  and has_role(auth.uid(), 'admin'::app_role)
);

-- Only admins can update quote images
create policy "Admins can update quote images"
on storage.objects
for update
to authenticated
using (
  bucket_id = 'quote-photos'
  and has_role(auth.uid(), 'admin'::app_role)
)
with check (
  bucket_id = 'quote-photos'
  and has_role(auth.uid(), 'admin'::app_role)
);

-- Only admins can delete quote images
create policy "Admins can delete quote images"
on storage.objects
for delete
to authenticated
using (
  bucket_id = 'quote-photos'
  and has_role(auth.uid(), 'admin'::app_role)
);

-- 3) Lock down audit logs: remove public insert, keep inserts via SECURITY DEFINER triggers only
drop policy if exists "Anyone can insert audit logs" on public.audit_logs;

-- Recreate audit functions as SECURITY DEFINER with fixed search_path
create or replace function public.log_quote_insert()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.audit_logs(event, entity, entity_id, actor_user_id, details)
  values (
    'quote_created',
    'quotes',
    new.id,
    auth.uid(),
    jsonb_build_object(
      'name', new.name,
      'email', new.email,
      'phone', new.phone,
      'service', new.service,
      'message_len', coalesce(length(new.message), 0)
    )
  );
  return new;
end;
$$;

create or replace function public.log_quote_file_insert()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  insert into public.audit_logs(event, entity, entity_id, actor_user_id, details)
  values (
    'quote_file_added',
    'quote_files',
    new.id,
    auth.uid(),
    jsonb_build_object(
      'quote_id', new.quote_id,
      'file_name', new.file_name,
      'file_path', new.file_path,
      'file_size', new.file_size,
      'mime_type', new.mime_type
    )
  );
  return new;
end;
$$;

-- 4) Ensure the rate-limit function has a fixed search_path
create or replace function public.enforce_quote_rate_limit()
returns trigger
language plpgsql
set search_path = public, pg_temp
as $$
declare
  recent_count int;
begin
  -- Block very frequent repeats by email within 2 minutes
  select count(*) into recent_count
  from public.quotes
  where email = new.email
    and created_at > now() - interval '2 minutes';

  if recent_count >= 1 then
    raise exception 'Rate limit: Please wait a couple of minutes before submitting another quote with this email.';
  end if;

  -- Also throttle by phone within 2 minutes (if provided)
  if new.phone is not null and length(trim(new.phone)) > 0 then
    select count(*) into recent_count
    from public.quotes
    where phone = new.phone
      and created_at > now() - interval '2 minutes';

    if recent_count >= 1 then
      raise exception 'Rate limit: Please wait a couple of minutes before submitting another quote with this phone number.';
    end if;
  end if;

  return new;
end;
$$;

-- 5) Attach missing triggers (idempotently)
do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'enforce_quote_rate_limit_before') then
    create trigger enforce_quote_rate_limit_before
    before insert on public.quotes
    for each row execute function public.enforce_quote_rate_limit();
  end if;
end$$;

do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'log_quote_after_insert') then
    create trigger log_quote_after_insert
    after insert on public.quotes
    for each row execute function public.log_quote_insert();
  end if;
end$$;

do $$
begin
  if not exists (select 1 from pg_trigger where tgname = 'log_quote_file_after_insert') then
    create trigger log_quote_file_after_insert
    after insert on public.quote_files
    for each row execute function public.log_quote_file_insert();
  end if;
end$$;

-- 6) Enforce unique (user_id, role) to prevent duplicates
create unique index if not exists user_roles_user_id_role_key
on public.user_roles(user_id, role);

-- 7) One-time bootstrap function to create the first admin safely
create or replace function public.bootstrap_admin()
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  -- Only allow if no admin exists
  if exists (select 1 from public.user_roles where role = 'admin') then
    raise exception 'Admin already exists';
  end if;

  -- Must be signed in
  if auth.uid() is null then
    raise exception 'Must be authenticated';
  end if;

  -- Grant admin to the caller
  insert into public.user_roles(user_id, role)
  values (auth.uid(), 'admin');
end;
$$;
