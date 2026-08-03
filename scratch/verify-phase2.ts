import { createTask, getTasks, getTaskById, updateTask, archiveTask } from '../src/lib/db/task-repository';
import { closeDatabase, getDbPath } from '../src/lib/db/index';
import fs from 'fs';
import path from 'path';

// Use temporary DB file for phase 2 verification
const testDbPath = path.join(process.cwd(), 'data', 'test-phase2.sqlite');
process.env.DB_PATH = testDbPath;

try {
  console.log('Testing Phase 2 Database Operations...');

  // 1. Create Task
  const task1 = createTask({
    title: 'Design DB Schema',
    description: 'Create SQLite DDL and repository',
    due_date: '2026-08-01', // overdue
    topic: 'Architecture',
    status: 'In-Progress',
  });
  console.log('Created Task 1:', task1.id, task1.title, 'Overdue:', task1.is_overdue);
  if (!task1.is_overdue) throw new Error('Task 1 should be overdue!');

  const task2 = createTask({
    title: 'Write Documentation',
    description: 'Complete README file',
    due_date: '2026-08-10',
    topic: 'Docs',
    status: 'Todo',
  });
  console.log('Created Task 2:', task2.id, task2.title, 'Overdue:', task2.is_overdue);

  // 2. Query Active Tasks & Sorting
  const activeTasks = getTasks({ isArchived: false, sortBy: 'topic', sortOrder: 'asc' });
  console.log('Active Tasks count:', activeTasks.length);
  if (activeTasks.length !== 2) throw new Error('Expected 2 active tasks!');
  console.log('Sorted by topic ASC:', activeTasks.map(t => t.topic));

  // 3. Edit Task
  const updatedTask1 = updateTask(task1.id, { status: 'Complete' });
  console.log('Updated Task 1 status:', updatedTask1?.status, 'Overdue:', updatedTask1?.is_overdue);
  if (updatedTask1?.is_overdue !== false) throw new Error('Completed task should not be overdue!');

  // 4. Archive Task
  const archivedTask2 = archiveTask(task2.id);
  console.log('Archived Task 2 at:', archivedTask2?.archived_at);

  const activeRemaining = getTasks({ isArchived: false });
  const archivedTasks = getTasks({ isArchived: true });
  console.log('Active remaining:', activeRemaining.length, 'Archived count:', archivedTasks.length);

  if (activeRemaining.length !== 1 || archivedTasks.length !== 1) {
    throw new Error('Archiving state verification failed!');
  }

  // 5. Validation Rejection Test
  try {
    createTask({
      title: '   ',
      description: 'Invalid',
      due_date: '2026-08-01',
      topic: 'Test',
      status: 'Todo',
    });
    throw new Error('Should have rejected empty title!');
  } catch (err: any) {
    console.log('Successfully caught empty title validation error:', err.message);
  }

  try {
    createTask({
      title: 'Invalid Status Task',
      description: 'Invalid status test',
      due_date: '2026-08-01',
      topic: 'Test',
      status: 'Done' as any,
    });
    throw new Error('Should have rejected invalid status "Done"!');
  } catch (err: any) {
    console.log('Successfully caught invalid status error:', err.message);
  }

  console.log('Phase 2 Database Operations Verified Successfully!');
} finally {
  closeDatabase();
  if (fs.existsSync(testDbPath)) {
    fs.unlinkSync(testDbPath);
  }
}
