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
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
      <div className="w-full max-w-xl rounded-lg border border-gray-800 bg-gray-900/95 p-8 shadow-2xl">
        <div className="flex items-center justify-between gap-3 mb-6">
          <h3 className="text-xl font-bold text-white">Edit task</h3>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-white text-2xl leading-none"
          >
            ×
          </button>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-gray-300">Title</span>
            <input
              value={title}
              onChange={(event) => setTitle(event.target.value)}
              className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-gray-300">Description</span>
            <textarea
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              rows={3}
              className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition resize-none"
            />
          </label>

          <div className="grid gap-4 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-gray-300">Due date</span>
              <input
                type="date"
                value={dueDate}
                onChange={(event) => setDueDate(event.target.value)}
                className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm">
              <span className="font-medium text-gray-300">Topic</span>
              <input
                value={topic}
                onChange={(event) => setTopic(event.target.value)}
                className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm">
            <span className="font-medium text-gray-300">Status</span>
            <select
              value={status}
              onChange={(event) => setStatus(event.target.value as TaskStatus)}
              className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition"
            >
              <option value="Todo">Todo</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Complete">Complete</option>
            </select>
          </label>

          {error ? <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/30 rounded-lg p-3">{error}</p> : null}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg border border-gray-700 px-4 py-2.5 text-sm text-gray-300 transition hover:bg-gray-800 hover:border-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-lg bg-green-500 px-4 py-2.5 text-sm font-semibold text-black transition hover:bg-green-400 active:bg-green-600"
            >
              Save changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
