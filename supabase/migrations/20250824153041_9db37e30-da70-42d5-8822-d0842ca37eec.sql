
-- Add address columns to the quotes table
ALTER TABLE public.quotes 
ADD COLUMN address_line_1 text,
ADD COLUMN address_line_2 text,
ADD COLUMN city text,
ADD COLUMN postcode text,
ADD COLUMN country text DEFAULT 'United Kingdom';

-- Add audit logging for the new address fields
CREATE OR REPLACE FUNCTION public.log_quote_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public', 'pg_temp'
AS $function$
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
      'message_len', coalesce(length(new.message), 0),
      'has_address', CASE WHEN new.address_line_1 IS NOT NULL THEN true ELSE false END,
      'city', new.city,
      'postcode', new.postcode,
      'country', new.country
    )
  );
  return new;
end;
$function$;
