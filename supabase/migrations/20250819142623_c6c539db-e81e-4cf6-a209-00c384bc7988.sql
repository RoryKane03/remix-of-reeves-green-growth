
-- 1) Audit logging table
create table if not exists public.audit_logs (
  id uuid primary key default gen_random_uuid(),
  event text not null,                  -- e.g., 'quote_created', 'quote_file_added'
  entity text not null,                 -- e.g., 'quotes', 'quote_files'
  entity_id uuid,                       -- id of the affected row
  actor_user_id uuid,                   -- null for anonymous, or auth user id if authenticated
  details jsonb,                        -- any extra details (email, file_name, etc.)
  created_at timestamptz not null default now()
);

-- Enable RLS
alter table public.audit_logs enable row level security;

-- Allow INSERT from anyone (so triggers can always log events)
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'audit_logs'
      and policyname = 'Anyone can insert audit logs'
  ) then
    create policy "Anyone can insert audit logs"
      on public.audit_logs
      for insert
      to anon, authenticated
      with check (true);
  end if;
end $$;

-- Only admins can SELECT, UPDATE, DELETE audit logs
do $$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'audit_logs'
      and policyname = 'Admins can read audit logs'
  ) then
    create policy "Admins can read audit logs"
      on public.audit_logs
      for select
      to authenticated
      using (public.has_role(auth.uid(), 'admin'::app_role));
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'audit_logs'
      and policyname = 'Admins can modify audit logs'
  ) then
    create policy "Admins can modify audit logs"
      on public.audit_logs
      for update
      to authenticated
      using (public.has_role(auth.uid(), 'admin'::app_role))
      with check (public.has_role(auth.uid(), 'admin'::app_role));
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'audit_logs'
      and policyname = 'Admins can delete audit logs'
  ) then
    create policy "Admins can delete audit logs"
      on public.audit_logs
      for delete
      to authenticated
      using (public.has_role(auth.uid(), 'admin'::app_role));
  end if;
end $$;

-- Helpful indexes
create index if not exists audit_logs_created_at_idx on public.audit_logs (created_at desc);
create index if not exists audit_logs_entity_idx on public.audit_logs (entity, created_at desc);

-- 2) Triggers to log inserts on quotes and quote_files

create or replace function public.log_quote_insert()
returns trigger
language plpgsql
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

drop trigger if exists trg_log_quote_insert on public.quotes;
create trigger trg_log_quote_insert
after insert on public.quotes
for each row execute function public.log_quote_insert();

create or replace function public.log_quote_file_insert()
returns trigger
language plpgsql
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

drop trigger if exists trg_log_quote_file_insert on public.quote_files;
create trigger trg_log_quote_file_insert
after insert on public.quote_files
for each row execute function public.log_quote_file_insert();

-- 3) Server-side rate limiting (by email/phone) for quotes

-- Helpful indexes for rate-limit checks
create index if not exists quotes_email_created_at_idx on public.quotes (email, created_at desc);
create index if not exists quotes_phone_created_at_idx on public.quotes (phone, created_at desc);

create or replace function public.enforce_quote_rate_limit()
returns trigger
language plpgsql
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

drop trigger if exists trg_enforce_quote_rate_limit on public.quotes;
create trigger trg_enforce_quote_rate_limit
before insert on public.quotes
for each row execute function public.enforce_quote_rate_limit();
