# SaaS UI Component Library

## Project Overview
Community component library (21st.dev style) for SaaS UI components.
Browse + copy code. No login required (Phase 1).

## Tech Stack
- **Frontend**: React 18 + Vite 6 + TypeScript + Tailwind CSS + Zustand
- **Backend**: Supabase (PostgreSQL + Auth + API)
- **Code Highlighting**: prism-react-renderer

## Supabase
- Project ID: iouvavvkenkbnboyevxp
- Region: ap-northeast-2

## Key Directories
```
frontend/src/
  lib/supabase.ts        # Supabase client
  stores/component-store.ts  # Zustand store
  types/component.ts     # Component types
  types/database.ts      # Supabase types
  components/ui/         # 21 base UI components
  components/shared/     # Shared components (code-block)
  components/layout/     # Layout components
  features/home/         # Home page
  features/explore/      # Browse/search page
  features/detail/       # Component detail page
  router/index.tsx       # Routes
```

## Routes
- `/` — Home (hero + featured + categories)
- `/explore` — Browse all components
- `/explore/:category` — Browse by category
- `/components/:slug` — Component detail + code

## Database Tables
- `categories` — 7 categories (UI, Data, Nav, Forms, Layouts, Templates, Feedback)
- `components` — 36 components with code, usage_code, tags, stats

## Commands
- `cd frontend && npm run dev` — Start dev server (port 3000)
- `cd frontend && npm run build` — Build for production

## Conventions
- Korean UI text, English code
- Tailwind CSS for styling (no CSS modules)
- Zustand for state management
- Feature-based file organization (features/{name}/pages/, components/)
