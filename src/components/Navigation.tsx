'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Navigation() {
  const pathname = usePathname();
  const isArchived = pathname.startsWith('/archived');

  return (
    <nav className="flex items-center gap-1 rounded-lg border border-gray-800 bg-gray-900/30 p-1 backdrop-blur-sm w-fit">
      <Link
        href="/"
        className={`rounded-md px-4 py-2 text-sm font-medium transition ${
          !isArchived
            ? 'bg-green-500 text-black'
            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
        }`}
      >
        Active tasks
      </Link>
      <Link
        href="/archived"
        className={`rounded-md px-4 py-2 text-sm font-medium transition ${
          isArchived
            ? 'bg-green-500 text-black'
            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
        }`}
      >
        Archived tasks
      </Link>
    </nav>
  );
}
