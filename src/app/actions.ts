'use server';

import { revalidatePath } from 'next/cache';
import { createTask } from '@/lib/db/task-repository';
import { CreateTaskInput } from '@/lib/types';

export async function createTaskAction(formData: FormData): Promise<void> {
  const input: CreateTaskInput = {
    title: String(formData.get('title') ?? '').trim(),
    description: String(formData.get('description') ?? '').trim(),
    due_date: String(formData.get('due_date') ?? '').trim(),
    topic: String(formData.get('topic') ?? '').trim(),
    status: (String(formData.get('status') ?? 'Todo') as CreateTaskInput['status']),
  };

  try {
    createTask(input);
    revalidatePath('/');
  } catch (error) {
    console.error('Failed to create task', error);
  }
}
