"use client";

import { useState } from 'react';
import { Task } from '@/lib/types';
import { EditTaskModal } from './EditTaskModal';

interface TaskCardProps {
  task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  const dueLabel = new Date(`${task.due_date}T00:00:00`).toLocaleDateString('en', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

  return (
    <>
      <article className="rounded-2xl border border-slate-700 bg-slate-800/70 p-5 shadow-sm">
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-slate-100">{task.title}</h3>
            <p className="mt-1 text-sm text-slate-400">{task.description}</p>
          </div>
          {task.is_overdue ? (
            <span className="rounded-full bg-rose-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-400">
              Overdue
            </span>
          ) : null}
        </div>

        <div className="mt-4 flex flex-wrap gap-2 text-sm text-slate-300">
          <span className="rounded-full bg-slate-700/80 px-3 py-1">Topic: {task.topic}</span>
          <span className="rounded-full bg-slate-700/80 px-3 py-1">Status: {task.status}</span>
          <span className="rounded-full bg-slate-700/80 px-3 py-1">Due: {dueLabel}</span>
        </div>

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            onClick={() => setIsEditOpen(true)}
            className="rounded-lg border border-slate-600 px-3 py-2 text-sm text-slate-200 transition hover:bg-slate-700"
          >
            Edit task
          </button>
        </div>
      </article>

      {isEditOpen ? <EditTaskModal task={task} onClose={() => setIsEditOpen(false)} /> : null}
    </>
  );
}
