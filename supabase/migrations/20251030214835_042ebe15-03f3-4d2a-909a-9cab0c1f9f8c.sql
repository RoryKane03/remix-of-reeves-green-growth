-- Phase 1: Critical Security Fixes
-- Fix 1: Remove unrestricted storage upload policies

-- Remove all permissive upload policies that allow anyone to upload
DROP POLICY IF EXISTS "Anyone can upload quote images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload quote photos" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can upload to quote-photos with UUID prefix" ON storage.objects;
DROP POLICY IF EXISTS "Public can upload to quote-photos with UUID prefix" ON storage.objects;

-- Add explicit SELECT policy for public viewing of quote photos
-- First drop if exists, then create
DROP POLICY IF EXISTS "Public can view quote photos" ON storage.objects;
CREATE POLICY "Public can view quote photos"
ON storage.objects
FOR SELECT
TO public
USING (bucket_id = 'quote-photos');

-- Fix 2: Restore security event logging
-- Remove the broken INSERT policy that blocks all inserts
DROP POLICY IF EXISTS "Only system can insert security events" ON public.security_events;

-- The log_security_event() RPC function uses SECURITY DEFINER and will bypass RLS
-- No INSERT policy needed

-- Fix 3: Enable audit logging for all operations
-- Remove the restrictive INSERT policy that prevents non-admin logging
DROP POLICY IF EXISTS "Only admins can insert audit logs" ON public.audit_logs;

-- The trigger functions (log_quote_insert, log_quote_file_insert) use SECURITY DEFINER
-- and will bypass RLS to insert audit logs for any operation