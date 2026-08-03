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
    <div className="flex flex-wrap items-center gap-4 rounded-lg border border-gray-800 bg-gray-900/30 p-4 backdrop-blur-sm">
      <span className="text-sm font-medium text-gray-400">Sort by</span>
      <select
        value={currentSortBy}
        onChange={(event) => updateSort(event.target.value as TaskSortField, currentSortOrder)}
        className="rounded-lg border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition"
      >
        <option value="due_date">Due date</option>
        <option value="topic">Topic</option>
        <option value="status">Status</option>
      </select>

      <div className="flex gap-1 ml-auto">
        <button
          type="button"
          onClick={() => updateSort(currentSortBy, 'asc')}
          className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
            currentSortOrder === 'asc'
              ? 'bg-green-500 text-black'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
          }`}
        >
          ↑ Asc
        </button>
        <button
          type="button"
          onClick={() => updateSort(currentSortBy, 'desc')}
          className={`rounded-lg px-3 py-2 text-xs font-medium transition ${
            currentSortOrder === 'desc'
              ? 'bg-green-500 text-black'
              : 'bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700'
          }`}
        >
          ↓ Desc
        </button>
      </div>
    </div>
  );
}
