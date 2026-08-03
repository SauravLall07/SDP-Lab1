import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Local-First To-Do Application',
  description: 'An assessed local-first task manager using Next.js and SQLite',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-black text-white">
        <header className="border-b border-gray-800 bg-black/50 backdrop-blur sticky top-0 z-40">
          <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-green-500">
                <svg className="w-5 h-5 text-black" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3" />
                </svg>
              </div>
              <h1 className="text-lg font-bold tracking-tight">Task Manager</h1>
            </div>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
