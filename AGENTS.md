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
- **Revised Micro Plan - Phase 1**: Make AddTaskForm Context-Aware
  - Removed project selection dropdown from AddTaskForm component
  - Added currentProjectName prop for automatic task assignment to current project
  - Simplified form interface to single task title input field
  - Updated form validation to require only task title (no project selection needed)
  - Integrated seamlessly with individual project pages for streamlined task creation
- **Revised Micro Plan - Phase 2**: Create ProjectCreateForm Component
  - Built dedicated ProjectCreateForm.tsx component with clean, reusable structure
  - Implemented single input field for new project name entry
  - Added comprehensive form validation (non-empty input, unique project names)
  - Included success feedback alerts after successful project creation
  - Designed props interface with onProjectCreate callback and existingProjects array
- **Revised Micro Plan - Phase 3**: Update ProjectDisplay for Project Management
  - Integrated ProjectCreateForm component into ProjectDisplay at top of layout
  - Implemented React state management for dynamic projects list
  - Added handleProjectCreate function to process new project creation
  - Updated mockProjects array to ensure new projects are accessible across components
  - Positioned project creation form above existing project cards for intuitive user experience
- **Phase 3**: Interactive todo management fully implemented
  - ✅ Task creation with automatic project assignment
  - ✅ Interactive checkboxes for completion status updates
  - ✅ Inline task editing (title and priority modifications)
  - ✅ Task deletion with user confirmation dialogs
  - ✅ Priority management (high/medium/low levels)
  - ✅ Task filtering by status and priority criteria
  - ✅ Visual progress indicators and completion tracking
  - ✅ URL encoding bug fix (encodeURIComponent/decodeURIComponent)

### 📋 Current Status
**Last Updated:** September 9, 2025
**Current Phase:** Revised Micro Plan completed, Phase 4 planning
**Navigation Flow:** Home page → Create new project or click existing project → Project page (context-aware task management with seamless project creation)
**Branch Tracking:** See [BRANCH_PROGRESS.md](./BRANCH_PROGRESS.md) for detailed branch status and development coordination

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
  - Completed revised microplan with context-aware task creation and project management
  - Implemented ProjectCreateForm for intuitive new project creation
  - Updated ProjectDisplay with state management and cross-component data synchronization
  - Ensured new projects are immediately accessible from project pages
  - Resolved all linting errors and verified successful build compilation
  - Maintained consistent code style and component patterns throughout