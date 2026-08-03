import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import path from 'path';
import os from 'os';
import fs from 'fs';
import { closeDatabase, getDatabase } from '../src/lib/db';
import { archiveTask, createTask, getTasks, updateTask } from '../src/lib/db/task-repository';
import { validateTaskInput } from '../src/lib/utils/validation';

const tempDirs: string[] = [];

function makeTempDbPath() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'sdp-lab1-'));
  tempDirs.push(dir);
  return path.join(dir, 'todo.sqlite');
}

describe('task repository', () => {
  beforeEach(() => {
    closeDatabase();
    process.env.DB_PATH = makeTempDbPath();
    getDatabase();
  });

  afterEach(() => {
    closeDatabase();
    delete process.env.DB_PATH;
    tempDirs.splice(0, tempDirs.length).forEach((dir) => fs.rmSync(dir, { recursive: true, force: true }));
  });

  it('creates and retrieves tasks with the expected fields', () => {
    const task = createTask({
      title: 'Write report',
      description: 'Finish the Q3 summary',
      due_date: '2026-08-10',
      topic: 'Work',
      status: 'Todo',
    });

    expect(task.title).toBe('Write report');
    expect(task.description).toBe('Finish the Q3 summary');
    expect(task.status).toBe('Todo');
    expect(task.archived_at).toBeNull();

    const persisted = getTasks({ isArchived: false });
    expect(persisted).toHaveLength(1);
    expect(persisted[0].id).toBe(task.id);
  });

  it('updates a task and persists the changes after reopening the database', () => {
    const created = createTask({
      title: 'Plan sprint',
      description: 'Set milestones',
      due_date: '2026-08-02',
      topic: 'Planning',
      status: 'Todo',
    });

    updateTask(created.id, {
      title: 'Plan sprint revised',
      description: 'Set milestones and owners',
      due_date: '2026-08-04',
      topic: 'Planning',
      status: 'In-Progress',
    });

    closeDatabase();
    getDatabase();

    const reloaded = getTasks({ isArchived: false });
    expect(reloaded).toHaveLength(1);
    expect(reloaded[0].title).toBe('Plan sprint revised');
    expect(reloaded[0].status).toBe('In-Progress');
    expect(reloaded[0].due_date).toBe('2026-08-04');
  });

  it('archives a task and moves it between active and archived lists', () => {
    const created = createTask({
      title: 'Archive me',
      description: 'This should move out of the active list',
      due_date: '2026-08-03',
      topic: 'Admin',
      status: 'Todo',
    });

    archiveTask(created.id);

    const active = getTasks({ isArchived: false });
    const archived = getTasks({ isArchived: true });

    expect(active).toHaveLength(0);
    expect(archived).toHaveLength(1);
    expect(archived[0].id).toBe(created.id);
    expect(archived[0].archived_at).not.toBeNull();
  });

  it('sorts tasks by topic, status, and due date using the allowed whitelist', () => {
    createTask({ title: 'C', description: 'c', due_date: '2026-08-10', topic: 'Zebra', status: 'Todo' });
    createTask({ title: 'A', description: 'a', due_date: '2026-08-01', topic: 'Apple', status: 'Complete' });
    createTask({ title: 'B', description: 'b', due_date: '2026-08-05', topic: 'Mango', status: 'In-Progress' });

    const byTopic = getTasks({ sortBy: 'topic', sortOrder: 'asc' });
    expect(byTopic.map((task) => task.topic)).toEqual(['Apple', 'Mango', 'Zebra']);

    const byStatus = getTasks({ sortBy: 'status', sortOrder: 'asc' });
    expect(byStatus.map((task) => task.title)).toEqual(['C', 'B', 'A']);

    const byDueDate = getTasks({ sortBy: 'due_date', sortOrder: 'desc' });
    expect(byDueDate.map((task) => task.title)).toEqual(['C', 'B', 'A']);
  });

  it('rejects invalid task input values', () => {
    const emptyTitle = validateTaskInput({ title: '   ', description: 'x', due_date: '2026-08-01', topic: 'Work', status: 'Todo' });
    expect(emptyTitle.isValid).toBe(false);
    expect(emptyTitle.errors.title).toContain('Title');

    const invalidStatus = validateTaskInput({ title: 'x', description: 'x', due_date: '2026-08-01', topic: 'Work', status: 'Done' });
    expect(invalidStatus.isValid).toBe(false);
    expect(invalidStatus.errors.status).toContain('Invalid status');
  });
});
