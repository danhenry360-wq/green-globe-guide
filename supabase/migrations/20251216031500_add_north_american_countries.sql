-- Add North American countries to the countries table
-- Canada, United States, and Mexico

INSERT INTO countries (name, slug, region, status, age_limit, last_updated)
VALUES 
  ('Canada', 'canada', 'North America', 'recreational', 19, now()),
  ('United States', 'united-states', 'North America', 'recreational', 21, now()),
  ('Mexico', 'mexico', 'North America', 'recreational', 18, now())
ON CONFLICT (slug) DO NOTHING;
