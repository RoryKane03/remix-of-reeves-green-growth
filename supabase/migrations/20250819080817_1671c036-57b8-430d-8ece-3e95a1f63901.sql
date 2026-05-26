
-- Create a table to store quote requests
CREATE TABLE public.quotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT,
  message TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table to store uploaded files associated with quotes
CREATE TABLE public.quote_files (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  quote_id UUID REFERENCES public.quotes(id) ON DELETE CASCADE NOT NULL,
  file_name TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_size INTEGER,
  mime_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create storage bucket for quote photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('quote-photos', 'quote-photos', true);

-- Enable Row Level Security on quotes table
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;

-- Enable Row Level Security on quote_files table  
ALTER TABLE public.quote_files ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert quotes (public form)
CREATE POLICY "Anyone can submit quotes" 
  ON public.quotes 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy to allow anyone to insert quote files (public form)
CREATE POLICY "Anyone can upload quote files" 
  ON public.quote_files 
  FOR INSERT 
  WITH CHECK (true);

-- Create policy for storage bucket to allow public uploads
CREATE POLICY "Anyone can upload quote photos" 
  ON storage.objects 
  FOR INSERT 
  WITH CHECK (bucket_id = 'quote-photos');

-- Create policy for storage bucket to allow public access to view photos
CREATE POLICY "Anyone can view quote photos" 
  ON storage.objects 
  FOR SELECT 
  USING (bucket_id = 'quote-photos');
