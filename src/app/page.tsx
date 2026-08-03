import { Suspense } from 'react';
import { getTasks } from '@/lib/db/task-repository';
import { TaskForm } from '@/components/TaskForm';
import { TaskList } from '@/components/TaskList';
import { SortControls } from '@/components/SortControls';
import { Navigation } from '@/components/Navigation';
import { TaskSortField, SortOrder } from '@/lib/types';

function getSortParams(searchParams: { [key: string]: string | string[] | undefined }) {
  const sortBy = (searchParams.sortBy as TaskSortField | undefined) ?? 'due_date';
  const sortOrder = (searchParams.sortOrder as SortOrder | undefined) ?? 'asc';
  return { sortBy, sortOrder };
}

export default function HomePage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const resolvedParams = searchParams ?? {};
  const { sortBy, sortOrder } = getSortParams(resolvedParams);
  const tasks = getTasks({ isArchived: false, sortBy, sortOrder });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Manage your tasks</h1>
          <p className="text-gray-400">Create, edit, and sort tasks to stay organized and productive.</p>
        </div>
        <Navigation />
      </div>

      <TaskForm />

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Active tasks</h2>
          <span className="rounded-full border border-gray-700 bg-gray-900/50 px-3 py-1 text-sm text-gray-300">
            {tasks.length} item{tasks.length === 1 ? '' : 's'}
          </span>
        </div>
        <Suspense fallback={null}>
          <SortControls currentSortBy={sortBy} currentSortOrder={sortOrder} />
        </Suspense>
        <TaskList tasks={tasks} emptyMessage="No active tasks yet. Create one above to get started." showArchiveButton />
      </section>
    </div>
  );
}
