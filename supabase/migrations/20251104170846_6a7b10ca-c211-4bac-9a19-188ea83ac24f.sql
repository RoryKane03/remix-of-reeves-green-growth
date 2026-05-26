-- Temporarily disable rate limit triggers for testing
-- These can be re-enabled later by recreating the triggers

DROP TRIGGER IF EXISTS enforce_quote_rate_limit_trigger ON quotes;
DROP TRIGGER IF EXISTS enforce_quote_rate_limit_trigger_v2 ON quotes;