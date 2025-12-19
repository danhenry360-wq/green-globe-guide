
-- Reconcile existing tours table with required schema
DO $$ 
BEGIN
    -- Add columns if they don't exist
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tours' AND column_name='rating') THEN
        ALTER TABLE public.tours ADD COLUMN rating NUMERIC DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tours' AND column_name='review_count') THEN
        ALTER TABLE public.tours ADD COLUMN review_count INTEGER DEFAULT 0;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tours' AND column_name='address') THEN
        ALTER TABLE public.tours ADD COLUMN address TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tours' AND column_name='state') THEN
        ALTER TABLE public.tours ADD COLUMN state TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tours' AND column_name='latitude') THEN
        ALTER TABLE public.tours ADD COLUMN latitude NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tours' AND column_name='longitude') THEN
        ALTER TABLE public.tours ADD COLUMN longitude NUMERIC;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tours' AND column_name='highlights') THEN
        ALTER TABLE public.tours ADD COLUMN highlights TEXT[];
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tours' AND column_name='duration') THEN
        ALTER TABLE public.tours ADD COLUMN duration TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tours' AND column_name='image') THEN
        ALTER TABLE public.tours ADD COLUMN image TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tours' AND column_name='status') THEN
        ALTER TABLE public.tours ADD COLUMN status TEXT DEFAULT 'active';
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tours' AND column_name='updated_at') THEN
        ALTER TABLE public.tours ADD COLUMN updated_at TIMESTAMPTZ DEFAULT now();
    END IF;
END $$;

-- Ensure city column exists if we want to use it alongside city_id
DO $$ 
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name='tours' AND column_name='city') THEN
        ALTER TABLE public.tours ADD COLUMN city TEXT;
    END IF;
END $$;

-- Insert/Update initial tour data: BEYOND: Light Show & Meditation
INSERT INTO public.tours (
    name, 
    slug, 
    city, 
    state, 
    address, 
    description, 
    price_range, 
    duration, 
    rating, 
    review_count, 
    image, 
    images, 
    highlights, 
    website, 
    latitude, 
    longitude
) VALUES (
    'BEYOND: Light Show & Meditation',
    'beyond-light-show-meditation',
    'Denver',
    'Colorado',
    '400 S Logan St, Denver, CO 80209',
    'An immersive, psychedelic audio-visual experience located within the historic International Church of Cannabis. The tour features a 3D-mapped laser light show, guided meditation, and access to unique art installations and a retro arcade. The venue is a 125-year-old church building transformed into a vibrant art sanctuary by world-renowned artists Okuda San Miguel and Kenny Scharf.',
    '$25.00',
    '1 hour',
    4.8,
    366,
    'https://beyondlightshow.com/cdn/shop/files/ChurchofCannabisLaserLightShow1_3_1000x.jpg?v=1686003041',
    ARRAY[
        'https://beyondlightshow.com/cdn/shop/files/ChurchofCannabisLaserLightShow1_3_1000x.jpg?v=1686003041',
        'https://beyondlightshow.com/cdn/shop/files/01orange_diskAngels_1000x.jpg?v=1686003041',
        'https://beyondlightshow.com/cdn/shop/files/01PsychedlcKaleidoscopeStage_1000x.jpg?v=1686003041'
    ],
    ARRAY[
        '3D Mapped Light Show',
        'Guided Meditation',
        'Retro Arcade Lounge',
        'World-Famous Art',
        'Art Gallery & Movie Theater'
    ],
    'https://beyondlightshow.com/',
    39.7089,
    -104.9823
) ON CONFLICT (slug) DO UPDATE SET
    city = EXCLUDED.city,
    state = EXCLUDED.state,
    address = EXCLUDED.address,
    description = EXCLUDED.description,
    price_range = EXCLUDED.price_range,
    duration = EXCLUDED.duration,
    rating = EXCLUDED.rating,
    review_count = EXCLUDED.review_count,
    image = EXCLUDED.image,
    images = EXCLUDED.images,
    highlights = EXCLUDED.highlights,
    website = EXCLUDED.website,
    latitude = EXCLUDED.latitude,
    longitude = EXCLUDED.longitude;
