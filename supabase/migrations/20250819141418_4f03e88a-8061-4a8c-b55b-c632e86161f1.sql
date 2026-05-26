-- Fix INFO warning: Add RLS policy for user_roles table so users can manage their own roles if needed
CREATE POLICY "Users can view their own roles"
ON public.user_roles
FOR SELECT
TO authenticated
USING (auth.uid() = user_id);

-- Optional: Allow admins to manage all user roles
CREATE POLICY "Admins can manage all user roles"
ON public.user_roles
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Note: The AUTH OTP warning is a platform setting that requires manual configuration in the dashboard