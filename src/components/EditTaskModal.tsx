'use client';

import { useState } from 'react';
import { updateTaskAction } from '@/app/actions';
import { Task, TaskStatus } from '@/lib/types';

interface EditTaskModalProps {
  task: Task;
  onClose: () => void;
}

export function EditTaskModal({ task, onClose }: EditTaskModalProps) {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [dueDate, setDueDate] = useState(task.due_date);
  const [topic, setTopic] = useState(task.topic);
  const [status, setStatus] = useState<TaskStatus>(task.status);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData();
    formData.set('id', String(task.id));
    formData.set('title', title);
    formData.set('description', description);
    formData.set('due_date', dueDate);
    formData.set('topic', topic);
    formData.set('status', status);

    const result = await updateTaskAction(formData);
    if (result.success) {
      onClose();
      window.location.reload();
      return;
    }

    setError(result.error ?? 'Unable to update task.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4">
      <div className="w-full max-w-xl rounded-2xl border border-slate-700 bg-slate-900 p-6 shadow-xl">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-slate-100">Edit task</h3>
          <button type="button" onClick={onClose} className="text-sm text-slate-400 hover:text-slate-200">
            Close
          </button>
        </div>

        <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-sm text-slate-200">
            <span>Title</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm text-slate-200">
            <span>Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm text-slate-200">
              <span>Due date</span>
              <input
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm text-slate-200">
              <span>Topic</span>
              <input
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm text-slate-200">
            <span>Status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as TaskStatus)}
              className="rounded-lg border border-slate-600 bg-slate-800 px-3 py-2 text-slate-100"
            >
              <option value="Todo">Todo</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Complete">Complete</option>
            </select>
          </label>

          {error ? <p className="text-sm text-rose-400">{error}</p> : null}

          <div className="flex justify-end gap-3">
            <button type="button" onClick={onClose} className="rounded-lg border border-slate-600 px-4 py-2 text-slate-200">
              Cancel
            </button>
            <button type="submit" className="rounded-lg bg-indigo-500 px-4 py-2 font-medium text-white">
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
