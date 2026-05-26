-- Replace overlapping policies with single comprehensive SELECT policy
DROP POLICY IF EXISTS "Quotes select by admin or owner" ON public.quotes;
DROP POLICY IF EXISTS "Quotes select anonymous by email" ON public.quotes;

CREATE POLICY "Quotes comprehensive select access"
ON public.quotes
FOR SELECT
USING (
  -- Admins can see all quotes
  has_role(auth.uid(), 'admin'::app_role)
  OR 
  -- Authenticated users can see their own quotes (linked by user_id)
  (auth.uid() IS NOT NULL AND user_id = auth.uid())
  OR
  -- Users can see anonymous quotes only if email matches their JWT email
  (
    user_id IS NULL 
    AND auth.uid() IS NOT NULL
    AND ((current_setting('request.jwt.claims', true))::json ->> 'email') IS NOT NULL
    AND email = ((current_setting('request.jwt.claims', true))::json ->> 'email')
  )
);