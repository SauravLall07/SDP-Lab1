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
      <body className="antialiased min-h-screen bg-slate-900 text-slate-100">
        <main className="max-w-5xl mx-auto px-4 py-8">
          {children}
        </main>
      </body>
    </html>
  );
}
