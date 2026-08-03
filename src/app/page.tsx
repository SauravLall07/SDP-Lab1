import { getTasks } from '@/lib/db/task-repository';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';

export default function HomePage() {
  const tasks = getTasks({ isArchived: false, sortBy: 'due_date', sortOrder: 'asc' });

  return (
    <div className="space-y-8">
      <header className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-400">
          Local-first task manager
        </p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-100">
          Manage your tasks with SQLite-backed persistence.
        </h1>
        <p className="max-w-2xl text-lg text-slate-300">
          Create and review tasks from this page. Everything is stored server-side and reloaded from SQLite on each visit.
        </p>
      </header>

      <TaskForm />

      <section className="space-y-4">
        <div className="flex items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-slate-100">Active tasks</h2>
          <span className="rounded-full border border-slate-700 bg-slate-800/70 px-3 py-1 text-sm text-slate-300">
            {tasks.length} item{tasks.length === 1 ? '' : 's'}
          </span>
        </div>
        <TaskList tasks={tasks} />
      </section>
    </div>
  );
}
