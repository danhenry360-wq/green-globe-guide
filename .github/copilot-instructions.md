# AI Agent Coding Guide for Green Globe Guide

This is **BudQuest** / **Green Globe Guide** - a comprehensive travel guide for cannabis tourism with location data, dispensary/rental listings, reviews, admin panels, and legal information across US states and global destinations.

## Architecture Overview

**Stack:** Vite + React + TypeScript + shadcn/ui + TailwindCSS + Supabase

**Key Directories:**
- `src/pages/` - 80+ city guides + auth, admin dashboards, blog pages
- `src/components/ui/` - shadcn/ui component library (auto-generated)
- `src/components/` - Custom: Navigation, Footer, AuthCallbackHandler, AgeGateModal, CookieConsent, review sections
- `src/hooks/` - useAuth (OTP-based auth), use-toast, use-mobile
- `src/integrations/supabase/` - Supabase client + auto-generated types
- `src/types/data.ts` - Core interfaces: Destination, Dispensary, Hotel, Tour, Review, StateRecord
- `src/data/` - Static data files (city descriptions, world data, hotel/country data)

## Critical Patterns

### 1. Authentication (OTP-based)
**Use `useAuth()` hook** - NOT direct Supabase auth calls.

```tsx
const { user, isAuthenticated, loading, signIn, signUp, verifyOTP, resendOTP } = useAuth();
```

**Signup flow:**
1. User enters email/password → `signUp()` sends OTP via `send-otp-email` edge function
2. Store pending data in sessionStorage
3. User enters OTP code → `verifyOTP()` validates via `verify-otp` edge function
4. On success, auto-signs in user

**Edge functions:** `/supabase/functions/` handle `send-otp-email` and `verify-otp`

### 2. Data Fetching & State Management
**Use React Query** - always for async operations:

```tsx
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

const { data: dispensaries } = useQuery({
  queryKey: ['dispensaries', city],
  queryFn: async () => {
    const { data, error } = await supabase.from('dispensaries').select('*').eq('city', city);
    if (error) throw error;
    return data;
  },
});

const mutation = useMutation({
  mutationFn: (newData) => supabase.from('table').insert(newData),
  onSuccess: () => queryClient.invalidateQueries({ queryKey: ['table'] }),
});
```

**DO NOT** use raw fetch or Promise chains for Supabase queries.

### 3. Supabase Integration
**Client:** `import { supabase } from '@/integrations/supabase/client'`

**Auto-generated types** from schema:
- `Database` type in `/src/integrations/supabase/types.ts`
- Use for fully typed `.from<'table_name'>()` calls

**Common tables:**
- `state_laws` (with changelog tracking)
- `country_laws`
- `dispensaries`, `hotels`, `tours`
- `reviews` (dispensary/hotel/tour reviews)
- `users`, `profiles`, `favorites`

**Changelog pattern** (for admin updates):
Track field changes → insert into `audit_logs` or `state_laws_changelog` with old/new values

### 4. Page Structure Convention
**City/State guides follow this pattern:**

```tsx
// src/pages/CityGuide.tsx
import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Helmet } from 'react-helmet'; // For SEO

export default function CityGuide() {
  const [dispensaries, setDispensaries] = useState([]);
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    // Fetch dispensaries and rentals by city
    const fetchData = async () => {
      const { data: dispData } = await supabase
        .from('dispensaries')
        .select('*')
        .eq('city', 'CityName');
      setDispensaries(dispData || []);
      // Similar for rentals
    };
    fetchData();
  }, []);

  return (
    <>
      <Helmet>
        <title>CityName Cannabis Guide | BudQuest</title>
      </Helmet>
      <Navigation />
      {/* Page content */}
      <Footer />
    </>
  );
}
```

### 5. Component Patterns
- **Use `@` alias** for imports: `import { Button } from '@/components/ui/button'`
- **shadcn/ui components** are in `src/components/ui/` - import ready to use
- **Custom components** (Navigation, Footer, etc.) in `src/components/`
- **All components use TailwindCSS** - no CSS files (except index.css)
- **Framer Motion** for animations: `import { motion } from 'framer-motion'`

### 6. Admin Panel Patterns
**Admin pages** (`/src/pages/Admin*.tsx`):
- Always check auth: `useAuth()` → redirect if not authenticated
- Check admin role: query `profiles.role = 'admin'` via `useQuery`
- Use modular dialog/form components for CRUD operations
- Track changes in audit logs with changelog (field_name, old_value, new_value, changed_by, changed_at)

Example: `AdminStateLaws.tsx` shows full CRUD + changelog tracking pattern

### 7. Environment Variables
**Required in `.env.local`:**
```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
```

**Vite uses `import.meta.env` (not `process.env`)**:
```tsx
const url = import.meta.env.VITE_SUPABASE_URL;
```

## Build & Development

```bash
npm run dev       # Start Vite dev server (port 8080)
npm run build     # Production build
npm run build:dev # Development build
npm run lint      # ESLint check
npm run preview   # Preview production build
```

**Vite plugins:**
- `@vitejs/plugin-react-swc` - Fast React compilation
- `lovable-tagger` (dev mode) - Development enhancement
- Path alias: `@` → `./src`

## Type Safety & Data Interfaces

**Core types in `src/types/data.ts`:**

```typescript
interface Destination { id, name, slug, country, continent, legalStatus, ... }
interface Dispensary { id, name, city, state, rating, reviewCount, ... }
interface Hotel { id, name, city, roomPrice, features, ... }
interface Tour { id, name, city, duration, price, ... }
interface StateRecord { id, status, possession_limits, airport_rules, ... }
```

**Always import from `@/types/data`** when typing response data.

## Key Files to Reference

- [App.tsx](src/App.tsx) - Route definitions, all pages imported, App wrapper structure
- [useAuth.ts](src/hooks/useAuth.ts) - Auth hook implementation (OTP flow)
- [AdminStateLaws.tsx](src/pages/AdminStateLaws.tsx) - Full admin CRUD + changelog pattern
- [Auth.tsx](src/pages/Auth.tsx) - Auth page with form validation (Zod schemas)
- [Profile.tsx](src/pages/Profile.tsx) - User profile with favorites + Supabase queries

## Common Gotchas

1. **Route ordering matters** in App.tsx - specific routes BEFORE generic `/blog/:slug`
2. **useAuth loading state** - always check `loading` before checking `isAuthenticated`
3. **Query invalidation** - after mutations, call `queryClient.invalidateQueries({ queryKey: [...] })`
4. **Supabase types** - use Database type for strong typing on `.from<'table'>()` calls
5. **Admin checks** - verify both auth AND admin role before rendering admin content
6. **OTP flow** - signup stores data in sessionStorage; verify must complete before closing window
7. **Age gate** - AgeGateModal component renders globally; triggers for certain pages

## Deployment & Vercel

- Configured via `vercel.json`
- `netlify.toml` also present (dual deployment setup)
- Environment variables must be set in deployment platform

---

**When adding features:** Reference AdminStateLaws or Auth pages for patterns. Use semantic_search for similar implementations before coding. Always use types from `@/types/data.ts`.
