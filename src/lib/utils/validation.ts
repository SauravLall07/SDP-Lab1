import { TaskStatus, VALID_STATUSES } from '../types';

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function validateTaskInput(input: {
  title?: string;
  description?: string;
  due_date?: string;
  topic?: string;
  status?: string;
}): ValidationResult {
  const errors: Record<string, string> = {};

  // Title validation
  if (!input.title || input.title.trim().length === 0) {
    errors.title = 'Title is required and cannot be empty or whitespace only.';
  }

  // Topic validation
  if (!input.topic || input.topic.trim().length === 0) {
    errors.topic = 'Topic is required and cannot be empty or whitespace only.';
  }

  // Status validation
  if (!input.status) {
    errors.status = 'Status is required.';
  } else if (!VALID_STATUSES.includes(input.status as TaskStatus)) {
    errors.status = `Invalid status "${input.status}". Status must be one of: ${VALID_STATUSES.join(', ')}.`;
  }

  // Due date validation
  if (!input.due_date || input.due_date.trim().length === 0) {
    errors.due_date = 'Due date is required.';
  } else {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(input.due_date.substring(0, 10))) {
      errors.due_date = 'Due date must be in YYYY-MM-DD format.';
    } else {
      const timestamp = Date.parse(input.due_date);
      if (isNaN(timestamp)) {
        errors.due_date = 'Due date must be a valid date.';
      }
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
