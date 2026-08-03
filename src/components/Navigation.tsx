'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();
  const isArchived = pathname.startsWith('/archived');

  return (
    <nav className="flex flex-wrap items-center gap-3 rounded-2xl border border-slate-700 bg-slate-800/70 p-3">
      <Link
        href="/"
        className={`rounded-lg px-3 py-2 text-sm font-medium transition ${!isArchived ? 'bg-indigo-500 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
      >
        Active tasks
      </Link>
      <Link
        href="/archived"
        className={`rounded-lg px-3 py-2 text-sm font-medium transition ${isArchived ? 'bg-indigo-500 text-white' : 'text-slate-300 hover:bg-slate-700'}`}
      >
        Archived tasks
      </Link>
    </nav>
  );
}
