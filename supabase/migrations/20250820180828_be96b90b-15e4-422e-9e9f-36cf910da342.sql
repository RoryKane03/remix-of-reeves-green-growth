
-- Create the app_role enum type
CREATE TYPE app_role AS ENUM ('admin', 'user');

-- Create quotes table
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT,
  message TEXT
);

-- Create quote_files table
CREATE TABLE public.quote_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id UUID NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  role app_role NOT NULL
);

-- Create audit_logs table
CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  event TEXT NOT NULL,
  entity TEXT NOT NULL,
  entity_id UUID,
  actor_user_id UUID,
  details JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_files ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Create has_role function
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role app_role)
RETURNS boolean
LANGUAGE sql
STABLE SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- RLS Policies for quotes
CREATE POLICY "Anyone can submit quotes" ON public.quotes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can select all quotes" ON public.quotes
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete quotes" ON public.quotes
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for quote_files
CREATE POLICY "Anyone can upload quote files" ON public.quote_files
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Admins can select all quote files" ON public.quote_files
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for user_roles
CREATE POLICY "Users can view their own roles" ON public.user_roles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage all user roles" ON public.user_roles
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS Policies for audit_logs
CREATE POLICY "Admins can read audit logs" ON public.audit_logs
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can modify audit logs" ON public.audit_logs
  FOR UPDATE USING (has_role(auth.uid(), 'admin'::app_role))
  WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can delete audit logs" ON public.audit_logs
  FOR DELETE USING (has_role(auth.uid(), 'admin'::app_role));

-- Create rate limiting trigger function
CREATE OR REPLACE FUNCTION public.enforce_quote_rate_limit()
RETURNS trigger
LANGUAGE plpgsql
SET search_path TO 'public', 'pg_temp'
AS $$
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

-- Create audit logging trigger functions
CREATE OR REPLACE FUNCTION public.log_quote_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $$
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

CREATE OR REPLACE FUNCTION public.log_quote_file_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $$
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

-- Create bootstrap admin function
CREATE OR REPLACE FUNCTION public.bootstrap_admin()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $$
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

-- Create triggers
CREATE TRIGGER enforce_quote_rate_limit_trigger
  BEFORE INSERT ON public.quotes
  FOR EACH ROW EXECUTE FUNCTION enforce_quote_rate_limit();

CREATE TRIGGER log_quote_insert_trigger
  AFTER INSERT ON public.quotes
  FOR EACH ROW EXECUTE FUNCTION log_quote_insert();

CREATE TRIGGER log_quote_file_insert_trigger
  AFTER INSERT ON public.quote_files
  FOR EACH ROW EXECUTE FUNCTION log_quote_file_insert();
