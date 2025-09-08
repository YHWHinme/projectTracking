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

## Development Progress & Roadmap

### ✅ Completed Phases
- **Phase 1**: Removed project-based links from sidebar (kept only Home button)
- **Phase 2**: Made home page projects clickable with navigation to individual project pages
  - Added Link components to project cards
  - Implemented URL slug generation (project names → kebab-case URLs)
  - Added hover effects and visual feedback
  - Added task count previews on project cards
  - Limited task display to first 3 tasks with "+X more" indicator
- **Phase 2.5 - Micro Plan**: Enhanced AddTask component with dynamic project dropdown
  - Added dropdown to select project assignment for new tasks
  - Populated dropdown with all projects from mockData
  - Updated form validation to require both task title and project selection
  - Integrated with project pages for task creation workflow
  - Created utility functions for task filtering and progress calculation
- **Phase 3**: Interactive todo management fully implemented and merged to main
  - ✅ Task creation with project selection
  - ✅ Interactive checkboxes for completion status
  - ✅ Inline task editing (title and priority)
  - ✅ Task deletion with confirmation dialogs
  - ✅ Priority management (high/medium/low)
  - ✅ Task filtering by status and priority
  - ✅ Visual progress indicators
  - ✅ URL encoding bug fix (encodeURIComponent/decodeURIComponent)
  - ✅ **Successfully merged to main on September 8, 2025**

### 📋 Current Status
**Last Updated:** September 8, 2025
**Current Phase:** Phase 3 completed and merged, Phase 4 planning
**Navigation Flow:** Home page → Click project → Project page (fully interactive todo management)
**Branch Tracking:** See [BRANCH_PROGRESS.md](./BRANCH_PROGRESS.md) for detailed branch status and development coordination
**Merge Status:** ✅ Phase 3 feature branch successfully merged to main

### 🎯 Next Phase: Phase 4 - State Management & Persistence
**Goal:** Implement local storage and global state management

**Priority Features:**
1. **Local Storage Integration**: Persist tasks and projects across browser sessions
2. **Data Migration**: Seamless transition from mock data to local storage
3. **State Synchronization**: Ensure consistent data across all components
4. **Storage Management**: Handle storage limits and data backup/restore

**Planned Implementation:**
- Implement localStorage API wrapper with error handling
- Add data serialization/deserialization utilities
- Create data migration scripts from mock data
- Add storage quota monitoring and user notifications

### 📋 Future Phases
- **Phase 5**: UI/UX polish (drag-drop, dark mode, animations)
- **Phase 6**: Backend integration with Express server
- **Phase 7**: Advanced features (templates, export/import, collaboration)

### 🛠️ Development Guidelines
**Component Structure**: Keep components modular and reusable
**State Management**: Plan for Context API or Zustand integration
**Testing**: Manual testing required until Jest setup
**Performance**: Optimize re-renders and bundle size
**Accessibility**: Ensure keyboard navigation and screen reader support
**Branch Management**: Always check [BRANCH_PROGRESS.md](./BRANCH_PROGRESS.md) before starting new work

### 📝 Implementation Notes
- Use functional components with hooks
- Follow existing Tailwind CSS patterns
- Maintain TypeScript strict typing
- Add loading states for better UX
- Implement error boundaries for robustness
- **Recent Updates:**
  - Phase 3 fully completed with all interactive features
  - URL encoding bug resolved for reliable project navigation
  - Branch progress tracking system implemented
  - All linting errors resolved
  - **Phase 3 feature branch successfully merged to main on September 8, 2025**
