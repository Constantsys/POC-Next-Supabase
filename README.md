# Next.js + Supabase CRUD (client-only)

Minimal CRUD example using Next.js (App Router), TypeScript, and Supabase—no Express or server actions. The browser talks directly to Supabase using `@supabase/supabase-js`.

## Getting started

1) Install deps
```
npm install
```

2) Provide Supabase URL/key (either inline in `lib/supabaseBrowser.ts` or via `.env.local`)
```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=YOUR_PUBLIC_ANON_KEY
```

3) Create table in Supabase SQL editor
```
create table public.todos (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  is_done boolean default false not null,
  created_at timestamp with time zone default now()
);

-- Development-only permissive policy (adjust for production)
alter table public.todos enable row level security;
create policy "Allow all for anon" on public.todos for all using (true) with check (true);
```

4) Run dev server
```
npm run dev
```

## How it works

- `app/page.tsx` is a client component that loads, inserts, updates, and deletes todos directly against Supabase.
- `app/components/TodoForm.tsx` inserts rows; `app/components/TodoList.tsx` toggles and deletes.
- `lib/supabaseBrowser.ts` holds the Supabase client (can read from `.env.local`).

Swap in your own Supabase URL and anon key (the ones you pasted in chat) and it will work out of the box.

