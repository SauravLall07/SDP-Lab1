import { Suspense } from 'react';
import { getTasks } from '@/lib/db/task-repository';
import { SortControls } from '@/components/SortControls';
import { TaskList } from '@/components/TaskList';
import { Navigation } from '@/components/Navigation';
import { TaskSortField, SortOrder } from '@/lib/types';

function getSortParams(searchParams: { [key: string]: string | string[] | undefined }) {
  const sortBy = (searchParams.sortBy as TaskSortField | undefined) ?? 'due_date';
  const sortOrder = (searchParams.sortOrder as SortOrder | undefined) ?? 'asc';
  return { sortBy, sortOrder };
}

export default function ArchivedPage({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const resolvedParams = searchParams ?? {};
  const { sortBy, sortOrder } = getSortParams(resolvedParams);
  const tasks = getTasks({ isArchived: true, sortBy, sortOrder });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Archived tasks</h1>
          <p className="text-gray-400">Review work that has been completed and archived. Tasks are never permanently deleted.</p>
        </div>
        <Navigation />
      </div>

      <section className="space-y-5">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold text-white">Completed work</h2>
          <span className="rounded-full border border-gray-700 bg-gray-900/50 px-3 py-1 text-sm text-gray-300">
            {tasks.length} item{tasks.length === 1 ? '' : 's'}
          </span>
        </div>
        <Suspense fallback={null}>
          <SortControls currentSortBy={sortBy} currentSortOrder={sortOrder} />
        </Suspense>
        <TaskList tasks={tasks} emptyMessage="No archived tasks yet." showArchiveButton={false} />
      </section>
    </div>
  );
}
