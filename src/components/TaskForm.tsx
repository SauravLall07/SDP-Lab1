import { createTaskAction } from '@/app/actions';

export function TaskForm() {
  return (
    <form action={createTaskAction} className="rounded-lg border border-gray-800 bg-gray-900/50 p-8 backdrop-blur-sm">
      <div className="flex items-start gap-4 mb-6">
        <div className="flex items-center justify-center w-10 h-10 rounded-full bg-green-500/20 flex-shrink-0">
          <span className="text-green-500">⊕</span>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Create a new task</h2>
          <p className="mt-1 text-sm text-gray-400">
            Add a task locally and it will persist in the SQLite database.
          </p>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-gray-300">Title <span className="text-green-500">*</span></span>
          <input
            name="title"
            required
            className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition"
            placeholder="Write a task title"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-gray-300">Topic</span>
          <input
            name="topic"
            required
            className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition"
            placeholder="e.g. Work, Study, Home"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm md:col-span-2">
          <span className="font-medium text-gray-300">Description</span>
          <textarea
            name="description"
            rows={3}
            className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition resize-none"
            placeholder="Add details about the task (optional)"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-gray-300">Due date <span className="text-green-500">*</span></span>
          <input
            name="due_date"
            type="date"
            required
            className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white placeholder-gray-500 outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition"
          />
        </label>

        <label className="flex flex-col gap-2 text-sm">
          <span className="font-medium text-gray-300">Status</span>
          <select
            name="status"
            defaultValue="Todo"
            className="rounded-lg border border-gray-700 bg-gray-800 px-4 py-2.5 text-white outline-none focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition"
          >
            <option value="Todo">Todo</option>
            <option value="In-Progress">In-Progress</option>
            <option value="Complete">Complete</option>
          </select>
        </label>
      </div>

      <div className="mt-7 flex items-center gap-3">
        <button
          type="submit"
          className="rounded-lg bg-green-500 px-5 py-2.5 font-medium text-black transition hover:bg-green-400 active:bg-green-600 flex items-center gap-2"
        >
          <span>+</span>
          <span>Create task</span>
        </button>
      </div>
    </form>
  );
}
