import { TaskStatus } from '../types';

/**
 * Formats a Date object to YYYY-MM-DD string in local system time deterministically.
 */
export function getTodayDateString(referenceDate?: Date): string {
  const d = referenceDate || new Date();
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Derives whether a task is overdue at read/display time.
 *
 * Deterministic Date Comparison Rules:
 * 1. Due date is stored in ISO date-only format (YYYY-MM-DD).
 * 2. A task is considered overdue IF AND ONLY IF:
 *    - Its status is NOT 'Complete' (i.e. 'Todo' or 'In-Progress')
 *    - AND its due_date string (YYYY-MM-DD) is strictly less than today's date string (YYYY-MM-DD).
 * 3. Tasks due today (due_date === today) are NOT overdue until the day has passed.
 * 4. Tasks marked 'Complete' are NEVER overdue regardless of due date.
 *
 * @param dueDateStr - Task due date in YYYY-MM-DD format
 * @param status - Task current status ('Todo' | 'In-Progress' | 'Complete')
 * @param referenceDateStr - Optional YYYY-MM-DD string to compare against (defaults to today's date)
 * @returns boolean indicating if the task is overdue
 */
export function isTaskOverdue(
  dueDateStr: string,
  status: TaskStatus,
  referenceDateStr?: string
): boolean {
  if (status === 'Complete') {
    return false;
  }

  const todayStr = referenceDateStr || getTodayDateString();
  const normalizedDueDate = dueDateStr.substring(0, 10);

  return normalizedDueDate < todayStr;
}
