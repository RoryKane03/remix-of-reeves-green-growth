-- Secure access to sensitive quote data by restricting SELECT to admins only
-- 1) Create roles infrastructure (enum, table, helper function)

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'app_role') THEN
    CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
  END IF;
END $$;

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  UNIQUE (user_id, role)
);

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function so RLS checks won't recurse
CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  );
$$;

-- 2) Ensure RLS is enabled on target tables
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quote_files ENABLE ROW LEVEL SECURITY;

-- 3) Add strict SELECT policies (admins only)
DROP POLICY IF EXISTS "Admins can select all quotes" ON public.quotes;
CREATE POLICY "Admins can select all quotes"
ON public.quotes
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

DROP POLICY IF EXISTS "Admins can select all quote files" ON public.quote_files;
CREATE POLICY "Admins can select all quote files"
ON public.quote_files
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Preserve existing public INSERT policies for submissions/uploads (do not modify)
-- Note: No action needed here as we keep current policies intact.
