-- Create table for storing signup form submissions
CREATE TABLE public.signup_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  preferred_language TEXT,
  purchase_intent TEXT,
  interests TEXT[],
  other_interests TEXT,
  agree_to_promotions BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.signup_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to insert (since this is a public signup form)
CREATE POLICY "Anyone can insert signup submissions" 
ON public.signup_submissions 
FOR INSERT 
WITH CHECK (true);

-- Create policy to allow reading own submissions (for future admin dashboard)
CREATE POLICY "Admin can view all signup submissions" 
ON public.signup_submissions 
FOR SELECT 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_signup_submissions_updated_at
BEFORE UPDATE ON public.signup_submissions
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();