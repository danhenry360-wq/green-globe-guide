-- Create favorites table
create table public.favorites (
  id uuid not null default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  dispensary_id uuid references public.dispensaries(id) on delete cascade,
  hotel_id uuid references public.hotels(id) on delete cascade,
  created_at timestamp with time zone not null default now(),
  constraint favorites_pkey primary key (id),
  constraint favorites_user_dispensary_unique unique (user_id, dispensary_id),
  constraint favorites_user_hotel_unique unique (user_id, hotel_id),
  constraint favorites_one_target check (
    (dispensary_id is not null and hotel_id is null) or
    (dispensary_id is null and hotel_id is not null)
  )
);

-- Enable RLS
alter table public.favorites enable row level security;

-- Policies
create policy "Users can view their own favorites"
  on public.favorites for select
  using (auth.uid() = user_id);

create policy "Users can insert their own favorites"
  on public.favorites for insert
  with check (auth.uid() = user_id);

create policy "Users can delete their own favorites"
  on public.favorites for delete
  using (auth.uid() = user_id);

-- Add indexes for performance
create index favorites_user_id_idx on public.favorites(user_id);
create index favorites_dispensary_id_idx on public.favorites(dispensary_id);
create index favorites_hotel_id_idx on public.favorites(hotel_id);
