# AGENTS.md - Project Tracking App

## Commands
**Backend**: `cd backend && npm run dev` (nodemon) | **Frontend**: `cd frontend && npm run dev` (Next.
js + Turbopack)
**Build**: `cd frontend && npm run build` | **Start**: `cd frontend && npm run start`
**Lint**: `cd frontend && npm run lint` (ESLint + Next.js core-web-vitals)
**Test**: No tests configured - setup Jest: `npm install --save-dev jest` then `npm test -- -
-testNamePattern="test name"`

## Code Style
**TypeScript**: Strict mode, ES2017 target, bundler resolution, `@/*` path aliases, functional
components
**Imports**: ES modules, external libs first, `import type` for types, absolute paths with `@/*`
**Naming**: PascalCase components/functions, camelCase variables/properties, kebab-case files,
UPPER_SNAKE_CASE constants
**React**: `Readonly<{children: React.ReactNode}>` props, `handle*` event handlers, descriptive state
names
**Styling**: Tailwind CSS utilities, responsive (sm:/md:/lg:), consistent spacing, transition effects
**Error Handling**: try/catch for async, graceful API errors, user-friendly error messages
**Structure**: Backend in server.js, Frontend in app/ directory, feature-grouped components, lib/ for
utilities

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

### 📋 Current Status
**Last Updated**: September 8, 2025
**Current Phase**: Phase 3 implementation in progress
**Navigation Flow**: Home page → Click project → Project page (interactive todo management)

### 🎯 Next Phase: Phase 3 - Enhance Project Pages
**Goal**: Transform read-only project pages into interactive todo management

**Priority Features:**
1. ✅ **Task Creation**: Add form to create new tasks with title and priority (IN PROGRESS)
2. **Interactive Checkboxes**: Toggle task completion status
3. **Task Editing**: Inline or modal editing of task details
4. **Task Deletion**: Remove tasks with confirmation dialog
5. **Priority Management**: Update task priorities (high/medium/low)
6. **Task Filtering**: Filter by completion status, priority
7. **Progress Tracking**: Visual progress indicators

**Files Modified:**
- `frontend/app/components/addTask.tsx` - Enhanced with project dropdown
- `frontend/app/projects/[projectName]/page.tsx` - Created interactive project page
- `frontend/app/lib/taskUtils.ts` - Added utility functions
- Create: `frontend/app/components/TaskForm.tsx` (renamed from AddTask)
- Create: `frontend/app/components/TaskItem.tsx`
- Create: `frontend/app/components/TaskList.tsx`

### 📋 Future Phases
- **Phase 4**: State management & local storage persistence
- **Phase 5**: UI/UX polish (drag-drop, dark mode, animations)
- **Phase 6**: Backend integration with Express server
- **Phase 7**: Advanced features (templates, export/import, collaboration)

### 🛠️ Development Guidelines
**Component Structure**: Keep components modular and reusable
**State Management**: Plan for Context API or Zustand integration
**Testing**: Manual testing required until Jest setup
**Performance**: Optimize re-renders and bundle size
**Accessibility**: Ensure keyboard navigation and screen reader support

### 📝 Implementation Notes
- Use functional components with hooks
- Follow existing Tailwind CSS patterns
- Maintain TypeScript strict typing
- Add loading states for better UX
- Implement error boundaries for robustness
- **Recent Update**: AddTask component now supports project selection for task assignment
