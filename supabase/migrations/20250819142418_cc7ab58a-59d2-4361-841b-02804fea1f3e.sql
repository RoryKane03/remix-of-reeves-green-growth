
-- 1) Make the quote-photos bucket private (no public reads)
update storage.buckets
set public = false
where id = 'quote-photos';

-- 2) Ensure RLS is enabled on storage.objects (usually enabled by default)
alter table storage.objects enable row level security;

-- 3) Create policies for the quote-photos bucket

-- Anyone (anon or authenticated) can UPLOAD to the quote-photos bucket,
-- but only into a folder that starts with a UUID (the quote ID).
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Anyone can upload to quote-photos'
  ) then
    create policy "Anyone can upload to quote-photos"
      on storage.objects
      for insert
      to anon, authenticated
      with check (
        bucket_id = 'quote-photos'
        and name ~ '^[0-9a-f-]{36}/' -- must start with a UUID folder (quoteId/...)
      );
  end if;
end $$;

-- Only admins can READ (download/list) files in the quote-photos bucket
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Admins can read quote-photos'
  ) then
    create policy "Admins can read quote-photos"
      on storage.objects
      for select
      to authenticated
      using (
        bucket_id = 'quote-photos'
        and public.has_role(auth.uid(), 'admin'::app_role)
      );
  end if;
end $$;

-- Only admins can UPDATE files metadata/content in the quote-photos bucket
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Admins can modify quote-photos'
  ) then
    create policy "Admins can modify quote-photos"
      on storage.objects
      for update
      to authenticated
      using (
        bucket_id = 'quote-photos'
        and public.has_role(auth.uid(), 'admin'::app_role)
      )
      with check (
        bucket_id = 'quote-photos'
      );
  end if;
end $$;

-- Only admins can DELETE files in the quote-photos bucket
do $$
begin
  if not exists (
    select 1 from pg_policies
    where schemaname = 'storage'
      and tablename = 'objects'
      and policyname = 'Admins can delete quote-photos'
  ) then
    create policy "Admins can delete quote-photos"
      on storage.objects
      for delete
      to authenticated
      using (
        bucket_id = 'quote-photos'
        and public.has_role(auth.uid(), 'admin'::app_role)
      );
  end if;
end $$;
