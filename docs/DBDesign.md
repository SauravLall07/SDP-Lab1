# Database Design

This document describes the database schema and design decisions for the Local-First To-Do Application.

## Overview

The application uses **SQLite 3** as its embedded relational database. SQLite was chosen for its simplicity, zero-configuration setup, and suitability for local-first applications with no external service dependencies.

### Database File Location
- Default: `./data/tasks.db`
- Auto-created on first application run
- Can be overridden via `DB_PATH` environment variable

## Schema

### Tasks Table

```sql
CREATE TABLE IF NOT EXISTS tasks (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  topic TEXT NOT NULL,
  due_date TEXT NOT NULL,
  status TEXT NOT NULL CHECK(status IN ('Todo', 'In-Progress', 'Complete')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  archived_at TEXT DEFAULT NULL
);
```

### Column Definitions

| Column | Type | Constraints | Description |
|--------|------|-------------|-------------|
| `id` | INTEGER | PRIMARY KEY, AUTOINCREMENT | Unique identifier for each task |
| `title` | TEXT | NOT NULL | Task title (required) |
| `description` | TEXT | DEFAULT '' | Detailed task description (optional) |
| `topic` | TEXT | NOT NULL | Category/topic (e.g., Work, Study, Home) |
| `due_date` | TEXT | NOT NULL | Due date in YYYY-MM-DD format |
| `status` | TEXT | NOT NULL, CHECK constraint | One of: 'Todo', 'In-Progress', 'Complete' |
| `created_at` | TEXT | NOT NULL, DEFAULT CURRENT_TIMESTAMP | ISO 8601 timestamp when task was created |
| `archived_at` | TEXT | DEFAULT NULL | ISO 8601 timestamp when archived (NULL if active) |

## Design Decisions

### No Hard Deletes
Tasks are **never permanently deleted**. Instead, they are soft-deleted using the `archived_at` column:
- **Active tasks**: `archived_at IS NULL`
- **Archived tasks**: `archived_at IS NOT NULL` (contains timestamp)

**Benefits:**
- Audit trail maintained
- Ability to restore archived tasks
- Data recovery options
- Complies with data retention policies

### Date Storage
Dates are stored as **TEXT in YYYY-MM-DD format** rather than UNIX timestamps or DATE type:
- Easier to query and debug
- Human-readable in database tools
- Consistent with application date handling
- No timezone complications for due dates

Timestamps use ISO 8601 format (YYYY-MM-DDTHH:MM:SS.sssZ):
- Sortable as text
- Includes time information for audit trails
- Standard format across the application

### Status Enum
Status is restricted to three predefined values via CHECK constraint:
- `Todo` - Not yet started
- `In-Progress` - Currently being worked on
- `Complete` - Finished (never overdue)

This enforces data integrity at the database level.

### Automatic Timestamps
- `created_at`: Automatically set to current timestamp on insert
- `archived_at`: Set by application code when archiving (not automatic)

## Indexes

Currently, no explicit indexes are defined beyond the PRIMARY KEY on `id`. 

**Potential optimization indexes** (for large datasets):
```sql
CREATE INDEX idx_archived_at ON tasks(archived_at);
CREATE INDEX idx_due_date ON tasks(due_date);
CREATE INDEX idx_status ON tasks(status);
CREATE INDEX idx_topic ON tasks(topic);
```

These would improve query performance on filtering and sorting operations. Not needed for the current use case but recommended for production with > 10,000 tasks.

## Queries

### Get Active Tasks (with sorting)
```sql
SELECT * FROM tasks
WHERE archived_at IS NULL
ORDER BY due_date ASC
```

Sorting supports three fields:
- `due_date` - Default sort field
- `topic` - Category sorting
- `status` - Status-based sorting (Todo → In-Progress → Complete)

### Get Archived Tasks
```sql
SELECT * FROM tasks
WHERE archived_at IS NOT NULL
ORDER BY due_date ASC
```

### Archive a Task
```sql
UPDATE tasks
SET archived_at = CURRENT_TIMESTAMP
WHERE id = ?
```

### Derived Fields (calculated in application)
- **is_overdue**: Computed per task based on:
  - Due date < today
  - Status is NOT 'Complete' (completed tasks are never overdue)
  - Not archived

## Data Integrity

### Constraints Enforced
1. **PRIMARY KEY**: Ensures unique task IDs
2. **NOT NULL**: Enforces required fields (title, topic, due_date, status)
3. **CHECK**: Restricts status to valid values
4. **DEFAULT**: Auto-populates timestamps

### Business Rules
1. **No Null Titles**: Tasks must have a non-empty title
2. **Valid Status Values**: Only Todo/In-Progress/Complete allowed
3. **Valid Dates**: Application validates YYYY-MM-DD format before insert/update
4. **No Overdue Completed Tasks**: "Complete" status implicitly means task is not overdue

### Validation Layer
All INSERT and UPDATE operations are validated in `src/lib/utils/validation.ts`:
- Title: Non-empty, max 255 characters
- Topic: Non-empty
- Due date: Valid YYYY-MM-DD format, valid date
- Status: Must be in VALID_STATUSES enum
- Description: Optional, auto-trimmed

## Performance Characteristics

### Table Size
For a typical user managing 100-500 tasks:
- Estimated storage: < 1 MB
- Query time: < 10ms for all operations
- Memory footprint: < 50 MB

### Scalability
SQLite is suitable for:
- Single-user applications ✅
- Up to ~100,000 records ✅
- Concurrent reads ✅

SQLite is NOT suitable for:
- Multi-user concurrent writes ❌
- Server-side database with many concurrent users ❌
- Extremely large datasets (> 1GB) ❌

## Backup & Recovery

### Manual Backup
```bash
cp ./data/tasks.db ./data/tasks.db.backup
```

### Restore from Backup
```bash
cp ./data/tasks.db.backup ./data/tasks.db
```

### Database Export (CSV)
```sql
.headers on
.mode csv
.output tasks.csv
SELECT * FROM tasks;
.output stdout
```

## Testing

For testing, the application supports custom database paths:
```bash
export DB_PATH=./test.db && npm run test
```

The test database is automatically cleaned up after each test suite run, ensuring test isolation and repeatability.

## Future Enhancements

1. **Indexes**: Add indexes on frequently-queried columns for large datasets
2. **Full-text Search**: Enable FTS5 for searching task titles and descriptions
3. **Subtasks**: Add support for nested tasks with foreign key relationships
4. **Tags**: Implement many-to-many relationship for task tags
5. **Recurrence**: Add support for recurring tasks with rule storage
6. **Data Export**: Add JSON/CSV export functionality
7. **Database Versioning**: Implement schema migrations for future updates

## References

- [SQLite Documentation](https://www.sqlite.org/docs.html)
- [Better-sqlite3 Documentation](https://github.com/WiseLibs/better-sqlite3)
- Application: [src/lib/db/schema.sql](../src/lib/db/schema.sql)
- Repository Layer: [src/lib/db/task-repository.ts](../src/lib/db/task-repository.ts)
