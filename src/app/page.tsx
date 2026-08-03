export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
      <h1 className="text-4xl font-bold tracking-tight text-indigo-400">
        Local-First To-Do Application
      </h1>
      <p className="text-lg text-slate-300 max-w-xl">
        Phase 1 initialized successfully. Server-side SQLite persistence powered by Next.js App Router and better-sqlite3.
      </p>
    </div>
  );
}
