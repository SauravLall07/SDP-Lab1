# Running the Local-First To-Do Application

This guide explains how to set up and run the SDP-Lab1 Task Manager application.

## Prerequisites

- **Node.js**: Version 20.0.0 or higher
- **npm**: Comes with Node.js
- **Operating System**: Windows, macOS, or Linux

You can verify your Node.js installation:
```bash
node --version
npm --version
```

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd SDP-Lab1
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```
   This will install all required packages listed in `package.json`, including:
   - Next.js 14.2.15 (React framework)
   - React 18.3.1 (UI library)
   - TypeScript 5.6.3 (type safety)
   - better-sqlite3 11.3.0 (SQLite database)
   - Tailwind CSS 3.4.14 (styling)
   - Vitest 2.1.3 (testing framework)

## Running the Application

### Development Server

Start the development server with hot-reload:
```bash
npm run dev
```

The application will start at `http://localhost:3000` (or the next available port if 3000 is in use).

**Features:**
- Hot module replacement (HMR) for instant updates
- Fast refresh on file changes
- Development error overlays

### Production Build & Run

1. **Build for production:**
   ```bash
   npm run build
   ```
   This creates an optimized production build in the `.next` directory.

2. **Start the production server:**
   ```bash
   npm start
   ```
   The app will run at `http://localhost:3000`

## Testing

Run the test suite:
```bash
npm run test
```

This executes all tests in the `tests/` directory using Vitest. Current test coverage includes:
- Task repository integration tests (5 tests)
- Overdue logic unit tests (2 tests)
- Total: 7 passing tests

## Linting

Check for code quality issues:
```bash
npm run lint
```

This runs ESLint with Next.js core-web-vitals configuration. The project maintains zero warnings and errors.

## Project Structure

```
.
├── src/
│   ├── app/
│   │   ├── page.tsx           # Home page (active tasks)
│   │   ├── archived/page.tsx   # Archived tasks page
│   │   ├── actions.ts          # Server actions for mutations
│   │   ├── layout.tsx          # Root layout with header
│   │   └── globals.css         # Global styles and Tailwind
│   ├── components/
│   │   ├── TaskForm.tsx        # Create task form
│   │   ├── TaskCard.tsx        # Individual task display
│   │   ├── TaskList.tsx        # Task list container
│   │   ├── EditTaskModal.tsx   # Task edit modal
│   │   ├── Navigation.tsx      # Tab navigation
│   │   └── SortControls.tsx    # Sorting UI
│   └── lib/
│       ├── db/
│       │   ├── index.ts        # Database connection singleton
│       │   ├── schema.sql      # SQLite schema
│       │   └── task-repository.ts  # Data access layer
│       ├── types.ts            # TypeScript interfaces
│       └── utils/
│           ├── date.ts         # Date utilities
│           └── validation.ts   # Input validation
├── tests/
│   ├── task-repository.test.ts # Repository tests
│   └── overdue.test.ts         # Overdue logic tests
├── docs/
│   ├── Running.md              # This file
│   ├── DBDesign.md             # Database schema & design
│   └── ThirdPartyCode.md       # Technology stack
├── package.json                # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── next.config.mjs             # Next.js configuration
├── tailwind.config.js          # Tailwind CSS configuration
└── README.md                   # Project overview
```

## Database

The application uses SQLite with the following behavior:

- **Location**: `./data/tasks.db` (created automatically on first run)
- **Schema**: Defined in `src/lib/db/schema.sql`
- **Auto-initialization**: Database and tables are created automatically if they don't exist
- **Environment Variable**: Set `DB_PATH` to use a custom database location (useful for testing)

Example for testing:
```bash
export DB_PATH=./test.db  # Unix/macOS
set DB_PATH=.\test.db     # Windows
npm run test
```

## Troubleshooting

### Port Already in Use
If port 3000 is already in use, Next.js will automatically try ports 3001, 3002, etc. Look for the message in the console showing which port the server is running on.

### Database Lock Issues
If you get database lock errors:
1. Ensure only one instance of the app is running
2. Close all terminals running `npm run dev`
3. Delete `.next` folder and restart: `rm -r .next && npm run dev`

### Module Not Found Errors
If you see "Cannot find module" errors:
1. Ensure all dependencies are installed: `npm install`
2. Rebuild the project: `npm run build`
3. Clear cache: `rm -r .next node_modules && npm install`

### TypeScript Errors
Verify TypeScript compilation:
```bash
npx tsc --noEmit
```

## Environment Setup

No environment variables are required for development. The application is fully self-contained with:
- Embedded SQLite database
- Local file system storage
- No external APIs or services

### Optional Configuration
- `DB_PATH`: Override the default database location (default: `./data/tasks.db`)
- `NODE_ENV`: Set to `production` for production builds (default: `development`)

## Development Workflow

1. **Make code changes** - Files auto-reload with HMR
2. **Run tests** - `npm run test` to verify functionality
3. **Check lint** - `npm run lint` for code quality
4. **Build** - `npm run build` before deployment

## Performance

- **Development build time**: ~2-3 seconds
- **Production build time**: ~5-10 seconds (includes optimization)
- **Database operations**: Typically < 50ms per query on modern hardware
- **Page load time**: < 2 seconds in production

## More Information

- See [DBDesign.md](./DBDesign.md) for database schema details
- See [ThirdPartyCode.md](./ThirdPartyCode.md) for technology stack information
- See [README.md](../README.md) for project overview
