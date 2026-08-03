'use server';

import { revalidatePath } from 'next/cache';
import { archiveTask, createTask, updateTask } from '@/lib/db/task-repository';
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
    revalidatePath('/archived');
  } catch (error) {
    console.error('Failed to create task', error);
  }
}

export async function updateTaskAction(formData: FormData): Promise<{ success: boolean; error?: string }> {
  const id = Number(formData.get('id'));
  const input = {
    title: String(formData.get('title') ?? '').trim(),
    description: String(formData.get('description') ?? '').trim(),
    due_date: String(formData.get('due_date') ?? '').trim(),
    topic: String(formData.get('topic') ?? '').trim(),
    status: String(formData.get('status') ?? 'Todo'),
  };

  try {
    const updatedTask = updateTask(id, input as never);
    revalidatePath('/');
    revalidatePath('/archived');
    return { success: Boolean(updatedTask) };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unable to update task.',
    };
  }
}

export async function archiveTaskAction(formData: FormData): Promise<void> {
  const id = Number(formData.get('id'));

  try {
    archiveTask(id);
    revalidatePath('/');
    revalidatePath('/archived');
  } catch (error) {
    console.error('Failed to archive task', error);
  }
}
