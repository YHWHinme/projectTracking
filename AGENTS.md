# AGENTS.md - Project Tracking App

## Commands
**Backend**: `cd backend && npm run dev` (nodemon) | **Frontend**: `cd frontend && npm run dev` (Next.js + Turbopack)
**Build**: `cd frontend && npm run build` | **Start**: `cd frontend && npm run start`
**Lint**: `cd frontend && npm run lint` (ESLint + Next.js core-web-vitals)
**Test**: No tests configured - setup Jest: `npm install --save-dev jest` then `npm test -- --testNamePattern="test name"`

## Code Style
**TypeScript**: Strict mode, ES2017 target, bundler resolution, `@/*` path aliases, functional components
**Imports**: ES modules, external libs first, `import type` for types, absolute paths with `@/*`
**Naming**: PascalCase components/functions, camelCase variables/properties, kebab-case files, UPPER_SNAKE_CASE constants
**React**: `Readonly<{children: React.ReactNode}>` props, `handle*` event handlers, descriptive state names
**Styling**: Tailwind CSS utilities, responsive (sm:/md:/lg:), consistent spacing, transition effects
**Error Handling**: try/catch for async, graceful API errors, user-friendly error messages
**Structure**: Backend in server.js, Frontend in app/ directory, feature-grouped components, lib/ for utilities