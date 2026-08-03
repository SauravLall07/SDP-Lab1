import { getDatabase } from './index';
import { Task, CreateTaskInput, UpdateTaskInput, TaskQueryOptions, VALID_SORT_FIELDS } from '../types';
import { validateTaskInput } from '../utils/validation';
import { isTaskOverdue } from '../utils/date';

interface TaskRow {
  id: number;
  title: string;
  description: string;
  due_date: string;
  topic: string;
  status: string;
  archived_at: string | null;
  created_at: string;
  updated_at: string;
}

function mapRowToTask(row: TaskRow): Task {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    due_date: row.due_date,
    topic: row.topic,
    status: row.status as Task['status'],
    archived_at: row.archived_at,
    created_at: row.created_at,
    updated_at: row.updated_at,
    is_overdue: isTaskOverdue(row.due_date, row.status as Task['status']),
  };
}

/**
 * Retrieves tasks from SQLite database based on options.
 * Parameters and ORDER BY clauses are strictly validated against whitelists to prevent SQL injection.
 */
export function getTasks(options: TaskQueryOptions = {}): Task[] {
  const db = getDatabase();
  const { isArchived = false, sortBy = 'due_date', sortOrder = 'asc' } = options;

  // Validate sort field against whitelist
  const safeSortBy = VALID_SORT_FIELDS.includes(sortBy) ? sortBy : 'due_date';
  const safeOrder = sortOrder.toLowerCase() === 'desc' ? 'DESC' : 'ASC';

  // Construct whitelisted ORDER BY clause
  let orderByClause = 'due_date ASC';
  if (safeSortBy === 'topic') {
    orderByClause = `topic ${safeOrder}, id ASC`;
  } else if (safeSortBy === 'due_date') {
    orderByClause = `due_date ${safeOrder}, id ASC`;
  } else if (safeSortBy === 'status') {
    // Custom status rank order: 1. Todo, 2. In-Progress, 3. Complete
    orderByClause = `
      CASE status
        WHEN 'Todo' THEN 1
        WHEN 'In-Progress' THEN 2
        WHEN 'Complete' THEN 3
        ELSE 4
      END ${safeOrder}, id ASC
    `;
  }

  const whereClause = isArchived ? 'archived_at IS NOT NULL' : 'archived_at IS NULL';
  const sql = `SELECT * FROM tasks WHERE ${whereClause} ORDER BY ${orderByClause}`;

  const statement = db.prepare(sql);
  const rows = statement.all() as TaskRow[];

  return rows.map(mapRowToTask);
}

/**
 * Retrieves a single task by ID.
 */
export function getTaskById(id: number): Task | null {
  const db = getDatabase();
  const statement = db.prepare('SELECT * FROM tasks WHERE id = ?');
  const row = statement.get(id) as TaskRow | undefined;

  if (!row) {
    return null;
  }

  return mapRowToTask(row);
}

/**
 * Creates a new task in the SQLite database after validating input.
 */
export function createTask(input: CreateTaskInput): Task {
  const validation = validateTaskInput(input);
  if (!validation.isValid) {
    const errorMsg = Object.values(validation.errors).join(' ');
    throw new Error(`Task validation failed: ${errorMsg}`);
  }

  const db = getDatabase();
  const statement = db.prepare(`
    INSERT INTO tasks (title, description, due_date, topic, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, datetime('now'), datetime('now'))
  `);

  const result = statement.run(
    input.title.trim(),
    (input.description || '').trim(),
    input.due_date.substring(0, 10),
    input.topic.trim(),
    input.status
  );

  const createdTask = getTaskById(Number(result.lastInsertRowid));
  if (!createdTask) {
    throw new Error('Failed to retrieve newly created task from database.');
  }

  return createdTask;
}

/**
 * Updates an existing task after validating input.
 */
export function updateTask(id: number, input: UpdateTaskInput): Task | null {
  const existingTask = getTaskById(id);
  if (!existingTask) {
    return null;
  }

  const mergedInput = {
    title: input.title !== undefined ? input.title : existingTask.title,
    description: input.description !== undefined ? input.description : existingTask.description,
    due_date: input.due_date !== undefined ? input.due_date : existingTask.due_date,
    topic: input.topic !== undefined ? input.topic : existingTask.topic,
    status: input.status !== undefined ? input.status : existingTask.status,
  };

  const validation = validateTaskInput(mergedInput);
  if (!validation.isValid) {
    const errorMsg = Object.values(validation.errors).join(' ');
    throw new Error(`Task validation failed: ${errorMsg}`);
  }

  const db = getDatabase();
  const statement = db.prepare(`
    UPDATE tasks
    SET title = ?, description = ?, due_date = ?, topic = ?, status = ?, updated_at = datetime('now')
    WHERE id = ?
  `);

  statement.run(
    mergedInput.title.trim(),
    mergedInput.description.trim(),
    mergedInput.due_date.substring(0, 10),
    mergedInput.topic.trim(),
    mergedInput.status,
    id
  );

  return getTaskById(id);
}

/**
 * Archives a task by setting archived_at timestamp.
 * Note: Tasks are never deleted from SQLite.
 */
export function archiveTask(id: number): Task | null {
  const db = getDatabase();
  const statement = db.prepare(`
    UPDATE tasks
    SET archived_at = datetime('now'), updated_at = datetime('now')
    WHERE id = ? AND archived_at IS NULL
  `);

  const result = statement.run(id);
  if (result.changes === 0) {
    return getTaskById(id);
  }

  return getTaskById(id);
}
