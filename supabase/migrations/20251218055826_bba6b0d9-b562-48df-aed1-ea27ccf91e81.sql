-- Add image_url column to countries table
ALTER TABLE public.countries ADD COLUMN IF NOT EXISTS image_url TEXT;

-- Insert North American countries (if not exists)
INSERT INTO public.countries (name, slug, status, region)
VALUES 
  ('United States', 'united-states', 'recreational', 'North America'),
  ('Canada', 'canada', 'recreational', 'North America'),
  ('Mexico', 'mexico', 'recreational', 'North America'),
  ('Bermuda', 'bermuda', 'illegal', 'North America'),
  ('Greenland', 'greenland', 'illegal', 'North America'),
  ('Saint Pierre and Miquelon', 'saint-pierre-miquelon', 'illegal', 'North America')
ON CONFLICT (slug) DO NOTHING;

-- Insert Central American countries
INSERT INTO public.countries (name, slug, status, region)
VALUES 
  ('Belize', 'belize', 'decriminalized', 'Central America'),
  ('Costa Rica', 'costa-rica', 'decriminalized', 'Central America'),
  ('El Salvador', 'el-salvador', 'illegal', 'Central America'),
  ('Guatemala', 'guatemala', 'illegal', 'Central America'),
  ('Honduras', 'honduras', 'illegal', 'Central America'),
  ('Nicaragua', 'nicaragua', 'illegal', 'Central America'),
  ('Panama', 'panama', 'decriminalized', 'Central America')
ON CONFLICT (slug) DO NOTHING;

-- Insert Caribbean countries  
INSERT INTO public.countries (name, slug, status, region)
VALUES 
  ('Jamaica', 'jamaica', 'decriminalized', 'Caribbean'),
  ('Cuba', 'cuba', 'illegal', 'Caribbean'),
  ('Dominican Republic', 'dominican-republic', 'illegal', 'Caribbean'),
  ('Haiti', 'haiti', 'illegal', 'Caribbean'),
  ('Puerto Rico', 'puerto-rico', 'medical', 'Caribbean'),
  ('Bahamas', 'bahamas', 'illegal', 'Caribbean'),
  ('Trinidad and Tobago', 'trinidad-and-tobago', 'decriminalized', 'Caribbean'),
  ('Barbados', 'barbados', 'decriminalized', 'Caribbean'),
  ('Saint Vincent', 'saint-vincent', 'decriminalized', 'Caribbean'),
  ('Antigua and Barbuda', 'antigua-and-barbuda', 'decriminalized', 'Caribbean'),
  ('US Virgin Islands', 'us-virgin-islands', 'recreational', 'Caribbean'),
  ('Cayman Islands', 'cayman-islands', 'illegal', 'Caribbean'),
  ('Aruba', 'aruba', 'illegal', 'Caribbean'),
  ('Curacao', 'curacao', 'illegal', 'Caribbean'),
  ('Saint Lucia', 'saint-lucia', 'decriminalized', 'Caribbean')
ON CONFLICT (slug) DO NOTHING;

-- Insert Asian countries (comprehensive list)
INSERT INTO public.countries (name, slug, status, region)
VALUES 
  ('Thailand', 'thailand', 'recreational', 'Asia'),
  ('Japan', 'japan', 'illegal', 'Asia'),
  ('South Korea', 'south-korea', 'illegal', 'Asia'),
  ('China', 'china', 'illegal', 'Asia'),
  ('Hong Kong', 'hong-kong', 'illegal', 'Asia'),
  ('Taiwan', 'taiwan', 'illegal', 'Asia'),
  ('India', 'india', 'illegal', 'Asia'),
  ('Nepal', 'nepal', 'illegal', 'Asia'),
  ('Sri Lanka', 'sri-lanka', 'illegal', 'Asia'),
  ('Bangladesh', 'bangladesh', 'illegal', 'Asia'),
  ('Pakistan', 'pakistan', 'illegal', 'Asia'),
  ('Indonesia', 'indonesia', 'illegal', 'Asia'),
  ('Malaysia', 'malaysia', 'illegal', 'Asia'),
  ('Singapore', 'singapore', 'illegal', 'Asia'),
  ('Philippines', 'philippines', 'illegal', 'Asia'),
  ('Vietnam', 'vietnam', 'illegal', 'Asia'),
  ('Cambodia', 'cambodia', 'illegal', 'Asia'),
  ('Laos', 'laos', 'illegal', 'Asia'),
  ('Myanmar', 'myanmar', 'illegal', 'Asia'),
  ('Brunei', 'brunei', 'illegal', 'Asia'),
  ('Timor-Leste', 'timor-leste', 'illegal', 'Asia'),
  ('Mongolia', 'mongolia', 'illegal', 'Asia'),
  ('Kazakhstan', 'kazakhstan', 'illegal', 'Asia'),
  ('Uzbekistan', 'uzbekistan', 'illegal', 'Asia'),
  ('Turkmenistan', 'turkmenistan', 'illegal', 'Asia'),
  ('Kyrgyzstan', 'kyrgyzstan', 'illegal', 'Asia'),
  ('Tajikistan', 'tajikistan', 'illegal', 'Asia'),
  ('Afghanistan', 'afghanistan', 'illegal', 'Asia'),
  ('Iran', 'iran', 'illegal', 'Asia'),
  ('Iraq', 'iraq', 'illegal', 'Asia'),
  ('Saudi Arabia', 'saudi-arabia', 'illegal', 'Asia'),
  ('United Arab Emirates', 'uae', 'illegal', 'Asia'),
  ('Qatar', 'qatar', 'illegal', 'Asia'),
  ('Kuwait', 'kuwait', 'illegal', 'Asia'),
  ('Bahrain', 'bahrain', 'illegal', 'Asia'),
  ('Oman', 'oman', 'illegal', 'Asia'),
  ('Yemen', 'yemen', 'illegal', 'Asia'),
  ('Jordan', 'jordan', 'illegal', 'Asia'),
  ('Syria', 'syria', 'illegal', 'Asia'),
  ('Lebanon', 'lebanon', 'medical', 'Asia'),
  ('Israel', 'israel', 'medical', 'Asia'),
  ('Palestine', 'palestine', 'illegal', 'Asia'),
  ('Turkey', 'turkey', 'illegal', 'Asia'),
  ('Georgia', 'georgia', 'decriminalized', 'Asia'),
  ('Armenia', 'armenia', 'illegal', 'Asia'),
  ('Azerbaijan', 'azerbaijan', 'illegal', 'Asia'),
  ('Maldives', 'maldives', 'illegal', 'Asia'),
  ('Bhutan', 'bhutan', 'illegal', 'Asia')
ON CONFLICT (slug) DO NOTHING;