# Next.js App Router Starter

A modern Next.js starter using TypeScript, Tailwind CSS, shadcn/ui, Lucide icons, and dark mode with `next-themes`.

## Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- shadcn/ui (`Button`, `Card`)
- Lucide React
- next-themes

## Project Structure

```text
src/
  app/                  # App Router pages and global styles
  components/
    layout/             # Shared layout UI (Navbar, Footer)
    providers/          # App-level providers
    ui/                 # shadcn/ui components
  features/
    theme-toggle/       # Feature module for theme switching
  hooks/                # Reusable React hooks
  lib/                  # Shared utilities
```

## Development

```bash
npm install
npm run dev
```

Build and lint:

```bash
npm run lint
npm run build
```
