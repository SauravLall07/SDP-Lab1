import { createTaskAction } from '@/app/actions';

export function TaskForm() {
  return (
    <form action={createTaskAction} className="rounded-2xl border border-slate-700 bg-slate-800/80 p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-xl font-semibold text-slate-100">Create a task</h2>
        <p className="mt-1 text-sm text-slate-400">
          Add a task locally and it will persist in the SQLite database.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-200">
          <span>Title</span>
          <input
            name="title"
            required
            className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-0"
            placeholder="Write a task title"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-slate-200">
          <span>Topic</span>
          <input
            name="topic"
            required
            className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-0"
            placeholder="Work, Study, Home"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-slate-200 md:col-span-2">
          <span>Description</span>
          <textarea
            name="description"
            rows={3}
            className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-0"
            placeholder="Add details about the task"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-slate-200">
          <span>Due date</span>
          <input
            name="due_date"
            type="date"
            required
            className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-0"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm text-slate-200">
          <span>Status</span>
          <select
            name="status"
            defaultValue="Todo"
            className="rounded-lg border border-slate-600 bg-slate-900 px-3 py-2 text-slate-100 outline-none ring-0"
          >
            <option value="Todo">Todo</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Complete">Complete</option>
          </select>
        </label>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        <button
          type="submit"
          className="rounded-lg bg-indigo-500 px-4 py-2 font-medium text-white transition hover:bg-indigo-400"
        >
          Create task
        </button>
      </div>
    </form>
  );
}
