CREATE TABLE public.ai_gateway_guard (id text PRIMARY KEY, status integer NOT NULL, message text NOT NULL);
GRANT ALL ON public.ai_gateway_guard TO service_role;
ALTER TABLE public.ai_gateway_guard ENABLE ROW LEVEL SECURITY;