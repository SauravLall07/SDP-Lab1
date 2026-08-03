# SDP-Lab1

A local-first to-do application built with Next.js, TypeScript, SQLite, and better-sqlite3.

## Third-Party Code

This project uses the following third-party libraries:

- Next.js for the App Router experience and server-rendered UI
- React and React DOM for the frontend component model
- better-sqlite3 for server-side SQLite access
- Vitest for automated testing
- Tailwind CSS for styling
- ESLint with Next.js defaults for linting

## Database Design

The application persists tasks in a single SQLite table named tasks.

### Schema

- id: INTEGER primary key
- title: TEXT not null
- description: TEXT not null
- due_date: TEXT not null (ISO date string)
- topic: TEXT not null
- status: TEXT not null with allowed values Todo, In-Progress, Complete
- archived_at: TEXT nullable archive timestamp
- created_at: TEXT not null
- updated_at: TEXT not null

### Business rules

- Tasks are never permanently deleted. They are archived by setting archived_at.
- Overdue status is derived at read time rather than stored in the database.
- The repository layer validates status values and required fields before writes.

## Running It

### Prerequisites

- Node.js 20 or newer
- npm

### Install dependencies

```bash
npm install
```

### Start the development server

```bash
npm run dev
```

Then open http://localhost:3000 (or the next available port if 3000 is busy).

### Run tests

```bash
npm test
```

### Lint the codebase

```bash
npm run lint
```

### Build for production

```bash
npm run build
```

## Verification

The project has been verified with:

- npm test
- npm run lint
- npm run build
