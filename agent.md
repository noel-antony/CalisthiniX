# CalistheniX - AI Agent Navigation Guide

## ⚠️ CRITICAL: Git Workflow for AI Agents

**IMPORTANT**: After implementing ANY feature or making useful changes:

```bash
git add .
git commit -m "feat: add user profile integration"
```

**Git Commit Rules**:
- ✅ Commit AFTER each feature is fully implemented and tested
- ✅ Use short, meaningful messages: "feat:", "fix:", "refactor:", "docs:"
- ✅ Commit small, logical changes (not 100-200 lines at once)
- ✅ Test locally before committing
- ✅ Never commit broken code or incomplete features

**Examples of Good Commit Messages**:
- `feat: integrate profile page with useMe hook`
- `fix: resolve database connection fallback`
- `refactor: simplify workout creation logic`
- `docs: update API endpoint documentation`

---

## 🤖 AI Agent Coding Guidelines

### Before Starting Any Task:
1. **Read this entire guide** - Don't skip sections
2. **Check current integration status** - See what's already done
3. **Verify server is running** - `npm run dev` should show no errors
4. **Test existing functionality** - Don't break working features
5. **Use existing patterns** - Follow established code structure

### File Editing Rules:
- **NEVER edit multiple files simultaneously** - Edit one file at a time
- **Include 3-5 lines of context** before/after changes for accuracy
- **Test after each change** - Browser console should be clean
- **Use exact file paths** - No relative paths, use absolute paths
- **Preserve existing code style** - Match indentation, naming, patterns

### API Integration Pattern:
```typescript
// 1. Create hook in client/src/hooks/
export function useNewFeature() {
  return useQuery({
    queryKey: ["/api/new-feature"],
    queryFn: async () => {
      const response = await fetch("/api/new-feature", {
        credentials: "include",
      });
      if (!response.ok) throw new Error(`${response.status}`);
      return response.json();
    },
  });
}

// 2. Use in component with loading/error states
function MyComponent() {
  const { data, isLoading, error } = useNewFeature();

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <Skeleton />;

  return <div>{data?.field}</div>;
}
```

### What NOT to Do:
- ❌ Don't edit files without reading them first
- ❌ Don't make assumptions about existing code
- ❌ Don't commit untested or broken code
- ❌ Don't change working functionality
- ❌ Don't ignore TypeScript errors
- ❌ Don't modify database schema without migration
- ❌ Don't hardcode values that should come from API

---

## 📍 Project Overview

**CalistheniX** is a full-stack calisthenics fitness tracking web application built with:
- **Frontend**: React 19 + Vite + TailwindCSS + shadcn/ui + TanStack Query
- **Backend**: Express.js + PostgreSQL + Drizzle ORM
- **Authentication**: Local development auth (Replit Auth in production)
- **Status**: ~70% complete - Core features functional, frontend data binding in progress

---

## 🗂️ Directory Structure

```
CalistheniX/
├── client/                          # React frontend application
│   ├── src/
│   │   ├── App.tsx                 # Main app router
│   │   ├── main.tsx                # Entry point
│   │   ├── index.css               # Global styles
│   │   ├── components/
│   │   │   ├── layout.tsx          # Main layout with sidebar/nav
│   │   │   └── ui/                 # 55+ shadcn/ui components
│   │   ├── hooks/
│   │   │   ├── useAuth.ts          # Auth hook (TanStack Query)
│   │   │   ├── useMe.ts            # User profile hook (NEW)
│   │   │   ├── use-mobile.tsx      # Mobile detection
│   │   │   └── use-toast.ts        # Toast notifications
│   │   ├── lib/
│   │   │   ├── queryClient.ts      # TanStack Query config
│   │   │   ├── authUtils.ts        # Auth utilities
│   │   │   └── utils.ts            # General utilities
│   │   └── pages/
│   │       ├── home.tsx            # Dashboard (50% integrated)
│   │       ├── profile.tsx         # User profile (NOW INTEGRATED)
│   │       ├── workout.tsx         # Workout logging (needs integration)
│   │       ├── roadmap.tsx         # Level progression (needs integration)
│   │       ├── coach.tsx           # AI coach chat (mock)
│   │       ├── landing.tsx         # Unauthenticated landing
│   │       └── not-found.tsx       # 404 page
│   ├── index.html                  # HTML template
│   └── public/                      # Static assets
│
├── server/                          # Express backend
│   ├── index.ts                    # Server entry point
│   ├── routes.ts                   # API route definitions (60+ endpoints)
│   ├── storage.ts                  # Database abstraction layer
│   ├── localAuth.ts                # Local development auth
│   ├── replitAuth.ts               # Replit OAuth (disabled in dev)
│   ├── vite.ts                     # Vite dev middleware setup
│   └── static.ts                   # Static file serving
│
├── shared/                          # Shared types and schemas
│   └── schema.ts                   # Drizzle ORM tables & Zod schemas
│
├── logs/                            # Application logs directory
│   └── README.md                   # Log documentation
│
├── attached_assets/                 # Generated images for UI
│   └── generated_images/           # PNG assets
│
├── script/                          # Build scripts
│   └── build.ts                    # Custom build script
│
├── .env                             # Environment variables (GITIGNORED)
├── .gitignore                       # Git ignore rules
├── drizzle.config.ts               # Drizzle ORM configuration
├── vite.config.ts                  # Vite configuration
├── tsconfig.json                   # TypeScript configuration
├── package.json                    # Dependencies and scripts
├── components.json                 # shadcn/ui component registry
├── seed.ts                          # Database seeding script
└── agent.md                         # THIS FILE
```

---

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Seed database with dummy data
npx tsx seed.ts

# Run development server (frontend + backend)
npm run dev

# Access the application
# Open http://localhost:5000 in your browser

# You'll be auto-logged in as "Developer"
# Database contains:
#   - 1 user (John Athlete, ID: local-user-123)
#   - 6 workouts
#   - 3 exercises
#   - 5 journal entries
#   - 4 personal records
```

---

## 📊 Available API Endpoints

### Authentication
- `GET /api/login` - Trigger login (redirects to home)
- `GET /api/logout` - Trigger logout (redirects to home)
- `GET /api/auth/user` - Get currently authenticated user

### User Profile ⭐ NEW
- `GET /api/users/me` - Get complete user profile with metadata
  - Returns: `{ id, email, displayName, firstName, lastName, profileImageUrl, currentLevel, levelProgress, streak, weight, lastWorkoutDate, workoutCount, createdAt, updatedAt }`

### User Management
- `GET /api/user/profile` - Get basic user profile
- `PATCH /api/user/profile` - Update user profile (displayName, weight, currentLevel, levelProgress)

### Workouts
- `GET /api/workouts` - List user's workouts (paginated, limit: 50)
- `GET /api/workouts/:id` - Get specific workout with exercises
- `POST /api/workouts` - Create new workout
- `PATCH /api/workouts/:id` - Update workout
- `DELETE /api/workouts/:id` - Delete workout

### Exercises
- `POST /api/workouts/:workoutId/exercises` - Add exercise to workout
- `DELETE /api/exercises/:id` - Delete exercise

### Journal
- `GET /api/journal` - Get journal entries (limit: 30)
- `POST /api/journal` - Create journal entry
- `PATCH /api/journal/:id` - Update journal entry

### Personal Records
- `GET /api/records` - Get all PRs for user
- `POST /api/records` - Create new personal record

### Analytics
- `GET /api/stats/weekly-volume` - Get weekly workout volume (last 7 days)

---

## 🔧 Key Technologies & Patterns

### Frontend Patterns
1. **TanStack Query** - Data fetching and caching
   - Location: `client/src/lib/queryClient.ts`
   - Usage: All API calls wrapped in `useQuery()` hooks
   - Example: `useMe()` hook in `client/src/hooks/useMe.ts`

2. **React Hooks** - State management
   - `useAuth()` - Get current user
   - `useMe()` - Get detailed user profile (NEW)
   - Custom hooks in `client/src/hooks/`

3. **TypeScript** - Type safety
   - Shared types in `shared/schema.ts`
   - Zod validation for API responses

4. **shadcn/ui** - Component library
   - 55+ pre-built components
   - TailwindCSS integrated
   - Located in `client/src/components/ui/`

### Backend Patterns
1. **Express Routes** - API endpoints
   - Organized in `server/routes.ts`
   - All endpoints require authentication (except `/api/login`, `/api/logout`)
   - Error handling with try-catch blocks

2. **Drizzle ORM** - Database abstraction
   - Schema definitions in `shared/schema.ts`
   - Storage layer in `server/storage.ts`
   - Type-safe queries

3. **Zod** - Data validation
   - All request bodies validated with Zod schemas
   - Error responses with `fromZodError()`

4. **PostgreSQL** - Database
   - Connection in `server/storage.ts`
   - Tables: users, workouts, exercises, journalEntries, personalRecords, sessions

---

## 🤖 AI Agent Implementation Steps

### Step-by-Step Feature Implementation:

1. **Plan the Feature**
   - Read existing similar code
   - Check API endpoints documentation
   - Plan database schema changes if needed

2. **Backend First** (Always implement backend before frontend)
   - Add Zod schema in `shared/schema.ts`
   - Add database method in `server/storage.ts`
   - Add API endpoint in `server/routes.ts` with error handling
   - Test endpoint with curl/Postman

3. **Frontend Second**
   - Create TanStack Query hook in `client/src/hooks/`
   - Update React component to use hook
   - Add loading states and error handling
   - Test in browser

4. **Testing & Commit**
   - Test locally - no console errors
   - Check mobile responsiveness
   - Commit with meaningful message
   - Verify server still starts without errors

### Common Implementation Patterns:

#### Adding a New Page:
```typescript
// 1. Create page: client/src/pages/newPage.tsx
import { useNewData } from "@/hooks/useNewData";

export default function NewPage() {
  const { data, isLoading, error } = useNewData();

  if (error) return <div>Error: {error.message}</div>;
  if (isLoading) return <Skeleton />;

  return <div>{/* Your content */}</div>;
}

// 2. Add route in App.tsx
<Route path="/new-page" component={NewPage} />

// 3. Add navigation in layout.tsx
<Link to="/new-page">New Page</Link>
```

#### Adding API Endpoint:
```typescript
// 1. Schema in shared/schema.ts
export const newDataSchema = z.object({
  id: z.string(),
  name: z.string(),
});

// 2. Storage method in server/storage.ts
async getNewData(userId: string): Promise<NewData[]> {
  return await db.select().from(newDataTable).where(eq(newDataTable.userId, userId));
}

// 3. Route in server/routes.ts
app.get("/api/new-data", isAuthenticated, async (req: any, res) => {
  try {
    const data = await storage.getNewData(req.user.id);
    res.json(data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});
```

---

## 📝 Adding New Features - Common Tasks

### Task: Add a new API endpoint
1. Define request/response schema in `shared/schema.ts` (Zod)
2. Add database method in `server/storage.ts` (IStorage interface)
3. Add route handler in `server/routes.ts` with error handling
4. Create TanStack Query hook in `client/src/hooks/` if needed
5. Use hook in React component

### Task: Create a new page
1. Create page file: `client/src/pages/[name].tsx`
2. Add route in `App.tsx` Router
3. Import and add to `<Route path="..." component={...} />`
4. Create navigation link in `client/src/components/layout.tsx`

### Task: Add database field to user
1. Add field to users table in `shared/schema.ts`
2. Run migration: `npm run db:push`
3. Update storage methods in `server/storage.ts`
4. Update API endpoints that return users
5. Update frontend types and hooks

### Task: Fix a database error
1. Check error message carefully
2. Verify schema in `shared/schema.ts` - field types match
3. Check database state: `npx tsx seed.ts` to reset
4. Add error logging and retry logic

---

## 📝 Adding New Features - Common Tasks

### Task: Add a new API endpoint
1. Define request/response schema in `shared/schema.ts` (Zod)
2. Add database method in `server/storage.ts` (IStorage interface)
3. Add route handler in `server/routes.ts` with error handling
4. Create TanStack Query hook in `client/src/hooks/` if needed
5. Use hook in React component

### Task: Create a new page
1. Create page file: `client/src/pages/[name].tsx`
2. Add route in `App.tsx` Router
3. Import and add to `<Route path="..." component={...} />`
4. Create navigation link in `client/src/components/layout.tsx`

### Task: Add database field to user
1. Add field to users table in `shared/schema.ts`
2. Run migration: `npm run db:push`
3. Update storage methods in `server/storage.ts`
4. Update API endpoints that return users
5. Update frontend types and hooks

### Task: Fix a database error
1. Check error message carefully
2. Verify schema in `shared/schema.ts` - field types match
3. Check database state: `npx tsx seed.ts` to reset
4. Add error logging and retry logic

---

## 🔐 Environment Variables

```env
# .env file (GITIGNORED)
DATABASE_URL=postgresql://postgres:PASSWORD@localhost:5432/calisthenix
SESSION_SECRET=your-random-secret-here
PORT=5000
```

**Never commit `.env` to git!**

---

## 🐛 Debugging Tips for AI Agents

### Before Making Changes:
1. **Read the full file** you're about to edit
2. **Check for existing similar patterns** in the codebase
3. **Verify server is running** and endpoints work
4. **Test current functionality** to ensure it works

### Common Issues & Solutions:

| Issue | Solution |
|-------|----------|
| "Password auth failed" | Check `.env` DATABASE_URL matches PostgreSQL password |
| "Cannot find module" | Run `npm install` to install missing packages |
| 404 on API call | Check endpoint path in route exactly matches hook URL |
| "User not found" | Run `npx tsx seed.ts` to populate database |
| Page shows skeleton forever | Check browser console for API errors |
| Hydration mismatch | Ensure server and client data match exactly |
| TypeScript errors | Check imports and type definitions in `shared/schema.ts` |
| Hook returns undefined | Check API endpoint returns correct JSON structure |

### File Editing Best Practices:
- **Always read the file first** - Understand existing code before editing
- **Include context lines** - Show 3-5 lines before/after your changes
- **Match existing style** - Indentation, naming conventions, patterns
- **Test immediately** - Check browser console after each change
- **One file at a time** - Don't edit multiple files simultaneously

### Testing Checklist:
- [ ] Server starts without errors (`npm run dev`)
- [ ] Browser console shows no errors
- [ ] API endpoints return 200 status
- [ ] Data displays correctly in UI
- [ ] Mobile responsive (check with dev tools)
- [ ] No TypeScript compilation errors
- [ ] Existing functionality still works

---

## ✅ Integration Checklist for AI Agents

**Follow this checklist for EVERY feature implementation:**

### Planning Phase:
- [ ] Read this `agent.md` file completely
- [ ] Check current integration status table above
- [ ] Identify which files need to be modified
- [ ] Read existing similar implementations first

### Backend Implementation:
- [ ] Schema defined in `shared/schema.ts` with Zod validation
- [ ] Database methods added to `server/storage.ts` IStorage interface
- [ ] API endpoints added to `server/routes.ts` with try-catch error handling
- [ ] Test endpoint manually (check terminal logs show 200 status)
- [ ] Verify error handling returns appropriate fallback data

### Frontend Implementation:
- [ ] TanStack Query hook created in `client/src/hooks/` with proper error handling
- [ ] React component updated to use hook with loading/error states
- [ ] Skeleton loading implemented during data fetch (use `<Skeleton />`)
- [ ] TypeScript types all correct, no `any` types used
- [ ] Console errors checked - should be clean (F12 → Console tab)

### Testing & Validation:
- [ ] Tested in browser - data displays correctly without errors
- [ ] Mobile responsive design verified (use dev tools device mode)
- [ ] Existing functionality still works (don't break other pages)
- [ ] Server restarts cleanly after changes
- [ ] Database connection works (or fallback data is returned)

### Final Steps:
- [ ] Commit changes with meaningful message (see git rules above)
- [ ] Update this `agent.md` if new patterns or endpoints added
- [ ] Test full application flow end-to-end

---

## 📚 Essential Files to Read First

**AI Agents MUST read these files before implementing features:**

| File | Why Read It | When to Read |
|------|-------------|--------------|
| `agent.md` | Complete project overview, patterns, rules | **ALWAYS FIRST** |
| `shared/schema.ts` | Database schema, Zod types, table structure | Before any database changes |
| `server/routes.ts` | Existing API endpoints, error patterns | Before adding new endpoints |
| `client/src/hooks/useMe.ts` | Current hook pattern, TanStack Query usage | Before creating new hooks |
| `client/src/pages/profile.tsx` | Current page integration pattern | Before modifying pages |
| `.env` | Environment variables structure | When setting up database |

### File Reading Order for New Features:
1. `agent.md` (this file) - Complete overview
2. Target component/page file - See current implementation
3. Related hook files - Understand data fetching patterns
4. `shared/schema.ts` - Check data types
5. `server/routes.ts` - See API endpoint patterns
6. `server/storage.ts` - Database method patterns

---

## 📚 Important Files to Know

| File | Purpose | When to Edit |
|------|---------|------------|
| `shared/schema.ts` | Database schema + Zod types | Adding database fields or new tables |
| `server/routes.ts` | API endpoints | Adding/modifying endpoints |
| `server/storage.ts` | Database queries | Database logic changes |
| `client/src/hooks/useMe.ts` | User profile hook | Changing user data structure |
| `client/src/pages/profile.tsx` | Profile page | Displaying user data |
| `.env` | Environment config | Database credentials |
| `seed.ts` | Database initialization | Adding test data |

---

## 🎯 Current Integration Status & Next Steps

| Page | Status | Integration Notes | Priority |
|------|--------|-------------------|----------|
| Landing | ✅ Complete | Static page, no API needed | - |
| Home | ⚠️ 60% | Chart partially integrated, needs user-specific data | HIGH |
| Profile | ✅ **JUST COMPLETED** | Fully integrated with `useMe()` hook, skeleton loading, real data | ✅ DONE |
| Workout | ❌ 10% | Needs full API integration for exercise logging | HIGH |
| Roadmap | ❌ 5% | Static data only, needs user level/progress integration | MEDIUM |
| Coach | ❌ 0% | Mock responses only, needs AI integration | LOW |

### Immediate Next Tasks for AI Agents:

1. **🏋️ Integrate Workout Page** (HIGH PRIORITY)
   - Connect exercise logging form to `POST /api/workouts` and `POST /api/workouts/:id/exercises`
   - Display user's workout history from `GET /api/workouts`
   - Add exercise selection from database

2. **🏠 Complete Home Page Integration** (HIGH PRIORITY)
   - Replace hardcoded "Pull & Skills B" with user's actual next workout from database
   - Show personalized workout summary and statistics
   - Connect weekly volume chart to real data

3. **🛣️ Integrate Roadmap Page** (MEDIUM PRIORITY)
   - Connect to `user.currentLevel` and `user.levelProgress` from `/api/users/me`
   - Mark completed levels dynamically
   - Show progress bars based on real user data

### AI Agent Workflow Reminder:
1. **Read this guide completely** before starting
2. **Check current status** - don't reimplement completed features
3. **Follow implementation steps** - backend first, then frontend
4. **Test thoroughly** - browser console clean, no errors
5. **Commit properly** - meaningful messages, small changes
6. **Update this guide** if you add new patterns or endpoints

---

## 🚨 Emergency Troubleshooting

If something breaks completely:

1. **Reset Database**: `npx tsx seed.ts`
2. **Clear Browser Data**: Cookies, localStorage, hard refresh (Ctrl+F5)
3. **Restart Server**: `Ctrl+C` then `npm run dev`
4. **Check Logs**: Terminal output and `logs/` directory
5. **Verify .env**: Database URL and credentials correct

**Never commit broken code** - fix issues before committing!

---

## 📞 Quick Reference Commands

```bash
# Start development
npm run dev

# Reset database
npx tsx seed.ts

# Check TypeScript
npx tsc --noEmit

# Format code (if prettier configured)
npm run format

# Git workflow
git add .
git commit -m "feat: meaningful description"
```

---

**Last Updated**: November 29, 2025

**Version**: 2.0 - Enhanced for AI Agent Usage

**Maintained By**: AI Agents & Development Team

