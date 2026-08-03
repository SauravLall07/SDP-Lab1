export type TaskStatus = 'Todo' | 'In-Progress' | 'Complete';

export const VALID_STATUSES: TaskStatus[] = ['Todo', 'In-Progress', 'Complete'];

export type TaskSortField = 'topic' | 'status' | 'due_date';

export const VALID_SORT_FIELDS: TaskSortField[] = ['topic', 'status', 'due_date'];

export type SortOrder = 'asc' | 'desc';

export interface Task {
  id: number;
  title: string;
  description: string;
  due_date: string; // ISO format: YYYY-MM-DD
  topic: string;
  status: TaskStatus;
  archived_at: string | null; // ISO 8601 string or null
  created_at: string;
  updated_at: string;
  is_overdue: boolean; // Derived at read time, not stored in DB
}

export interface CreateTaskInput {
  title: string;
  description: string;
  due_date: string;
  topic: string;
  status: TaskStatus;
}

export interface UpdateTaskInput {
  title?: string;
  description?: string;
  due_date?: string;
  topic?: string;
  status?: TaskStatus;
}

export interface TaskQueryOptions {
  isArchived?: boolean;
  sortBy?: TaskSortField;
  sortOrder?: SortOrder;
}
