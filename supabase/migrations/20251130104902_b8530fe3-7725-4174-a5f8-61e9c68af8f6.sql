-- Create state law changelog table
CREATE TABLE public.state_law_changelog (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  state_id UUID NOT NULL REFERENCES public.states(id) ON DELETE CASCADE,
  changed_by UUID NOT NULL,
  field_name TEXT NOT NULL,
  old_value TEXT,
  new_value TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.state_law_changelog ENABLE ROW LEVEL SECURITY;

-- Admin can manage all changelog entries
CREATE POLICY "Admins can manage changelog"
ON public.state_law_changelog
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Public can read changelog
CREATE POLICY "Public can read changelog"
ON public.state_law_changelog
FOR SELECT
USING (true);

-- Create index for faster lookups
CREATE INDEX idx_state_law_changelog_state_id ON public.state_law_changelog(state_id);
CREATE INDEX idx_state_law_changelog_created_at ON public.state_law_changelog(created_at DESC);