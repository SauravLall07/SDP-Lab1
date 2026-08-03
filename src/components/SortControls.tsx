'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { SortOrder, TaskSortField } from '@/lib/types';

interface SortControlsProps {
  currentSortBy: TaskSortField;
  currentSortOrder: SortOrder;
}

export function SortControls({ currentSortBy, currentSortOrder }: SortControlsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateSort = (sortBy: TaskSortField, sortOrder: SortOrder) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('sortBy', sortBy);
    params.set('sortOrder', sortOrder);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800/70 p-4">
      <label className="text-sm font-medium text-slate-300">
        Sort by
        <select
          value={currentSortBy}
          onChange={(event) => updateSort(event.target.value as TaskSortField, currentSortOrder)}
          className="ml-2 rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100"
        >
          <option value="due_date">Due date</option>
          <option value="topic">Topic</option>
          <option value="status">Status</option>
        </select>
      </label>

      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => updateSort(currentSortBy, 'asc')}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition ${currentSortOrder === 'asc' ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'}`}
        >
          Ascending
        </button>
        <button
          type="button"
          onClick={() => updateSort(currentSortBy, 'desc')}
          className={`rounded-lg px-3 py-2 text-sm font-medium transition ${currentSortOrder === 'desc' ? 'bg-indigo-500 text-white' : 'bg-slate-700 text-slate-200 hover:bg-slate-600'}`}
        >
          Descending
        </button>
      </div>
    </div>
  );
}
