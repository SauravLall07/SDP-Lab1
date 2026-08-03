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
      <Navigation />

      <header className="space-y-3">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-indigo-400">Archived tasks</p>
        <h1 className="text-4xl font-bold tracking-tight text-slate-100">Review your archived work.</h1>
        <p className="max-w-2xl text-lg text-slate-300">
          Tasks are never deleted permanently. They remain in the SQLite database with an archive timestamp.
        </p>
      </header>

      <section className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-2xl font-semibold text-slate-100">Archived tasks</h2>
          <span className="rounded-full border border-slate-700 bg-slate-800/70 px-3 py-1 text-sm text-slate-300">
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
