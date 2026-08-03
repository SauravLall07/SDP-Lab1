import { describe, expect, it } from 'vitest';
import { isTaskOverdue } from '../src/lib/utils/date';

describe('overdue logic', () => {
  it('marks non-complete tasks overdue when due date is before today', () => {
    expect(isTaskOverdue('2026-07-31', 'Todo', '2026-08-03')).toBe(true);
    expect(isTaskOverdue('2026-07-31', 'In-Progress', '2026-08-03')).toBe(true);
  });

  it('does not mark complete tasks or tasks due today or later as overdue', () => {
    expect(isTaskOverdue('2026-08-03', 'Todo', '2026-08-03')).toBe(false);
    expect(isTaskOverdue('2026-08-04', 'Todo', '2026-08-03')).toBe(false);
    expect(isTaskOverdue('2026-08-01', 'Complete', '2026-08-03')).toBe(false);
  });
});
