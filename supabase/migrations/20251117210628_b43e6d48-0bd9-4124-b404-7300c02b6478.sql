-- Create enum for legal status
CREATE TYPE legal_status AS ENUM ('illegal', 'decriminalized', 'medical', 'recreational');

-- Countries table
CREATE TABLE countries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  region text,
  status legal_status NOT NULL DEFAULT 'illegal',
  possession_limits text,
  purchase_limits text,
  age_limit integer,
  consumption_notes text,
  penalties text,
  airport_rules text,
  last_updated timestamptz DEFAULT now(),
  source_url text,
  created_at timestamptz DEFAULT now()
);

-- States table (for US states)
CREATE TABLE states (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  country_id uuid REFERENCES countries(id),
  status legal_status NOT NULL DEFAULT 'illegal',
  possession_limits text,
  tourist_notes text,
  where_to_consume text,
  driving_rules text,
  airport_rules text,
  last_updated timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Cities table
CREATE TABLE cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  state_id uuid REFERENCES states(id),
  description text,
  top_attractions text[],
  created_at timestamptz DEFAULT now()
);

-- Hotels/Accommodations table
CREATE TABLE hotels (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  city_id uuid REFERENCES cities(id),
  address text,
  latitude numeric,
  longitude numeric,
  is_420_friendly boolean DEFAULT false,
  policies text,
  website text,
  rating numeric,
  images text[],
  created_at timestamptz DEFAULT now()
);

-- Tours table
CREATE TABLE tours (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  city_id uuid REFERENCES cities(id),
  description text,
  price_range text,
  website text,
  images text[],
  created_at timestamptz DEFAULT now()
);

-- Enable RLS (public read access for now)
ALTER TABLE countries ENABLE ROW LEVEL SECURITY;
ALTER TABLE states ENABLE ROW LEVEL SECURITY;
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;
ALTER TABLE hotels ENABLE ROW LEVEL SECURITY;
ALTER TABLE tours ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read countries" ON countries FOR SELECT USING (true);
CREATE POLICY "Public read states" ON states FOR SELECT USING (true);
CREATE POLICY "Public read cities" ON cities FOR SELECT USING (true);
CREATE POLICY "Public read hotels" ON hotels FOR SELECT USING (true);
CREATE POLICY "Public read tours" ON tours FOR SELECT USING (true);

-- Indexes for performance
CREATE INDEX idx_states_country ON states(country_id);
CREATE INDEX idx_cities_state ON cities(state_id);
CREATE INDEX idx_hotels_city ON hotels(city_id);
CREATE INDEX idx_hotels_420_friendly ON hotels(is_420_friendly);
CREATE INDEX idx_tours_city ON tours(city_id);