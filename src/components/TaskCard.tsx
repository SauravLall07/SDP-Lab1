"use client";

import { useState } from 'react';
import { archiveTaskAction } from '@/app/actions';
import { Task } from '@/lib/types';
import { EditTaskModal } from './EditTaskModal';

interface TaskCardProps {
  task: Task;
  showArchiveButton?: boolean;
}

export function TaskCard({ task, showArchiveButton = true }: TaskCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const dueLabel = new Date(`${task.due_date}T00:00:00`).toLocaleDateString('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <>
      <article className="rounded-lg border border-gray-800 bg-gray-900/30 p-5 backdrop-blur-sm hover:bg-gray-900/50 transition group relative">
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-green-500 rounded-l-lg"></div>
        
        <div className="flex flex-wrap items-start justify-between gap-3 ml-2">
          <div className="flex-1">
            <h3 className="text-base font-semibold text-white">{task.title}</h3>
            <p className="mt-1.5 text-sm text-gray-400">{task.description}</p>
          </div>
          {task.is_overdue ? (
            <span className="rounded-full bg-red-500/20 px-2.5 py-1 text-xs font-semibold text-red-400 flex-shrink-0">
              Overdue
            </span>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-xs ml-2">
          <span className="rounded-full bg-gray-800 px-2.5 py-1 text-gray-300">Topic: <span className="text-green-400 font-medium">{task.topic}</span></span>
          <span className="rounded-full bg-gray-800 px-2.5 py-1 text-gray-300">Status: <span className="text-green-400 font-medium">{task.status}</span></span>
          <span className="rounded-full bg-gray-800 px-2.5 py-1 text-gray-300">Due: <span className="text-green-400 font-medium">{dueLabel}</span></span>
        </div>

        <div className="mt-5 flex flex-wrap justify-end gap-2 ml-2">
          <button
            type="button"
            onClick={() => setIsEditOpen(true)}
            className="rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-300 transition hover:bg-gray-800 hover:border-green-500/50 hover:text-green-400"
          >
            ✎ Edit
          </button>
          {showArchiveButton ? (
            <form action={archiveTaskAction} className="inline">
              <input type="hidden" name="id" value={task.id} />
              <button
                type="submit"
                className="rounded-lg border border-gray-700 px-3 py-2 text-sm text-gray-300 transition hover:bg-gray-800 hover:border-amber-500/50 hover:text-amber-400"
              >
                Archive
              </button>
            </form>
          ) : null}
        </div>
      </article>

      {isEditOpen ? <EditTaskModal task={task} onClose={() => setIsEditOpen(false)} /> : null}
    </>
  );
}
