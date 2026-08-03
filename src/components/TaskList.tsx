import { Task } from '@/lib/types';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
  emptyMessage?: string;
  showArchiveButton?: boolean;
}

export function TaskList({ tasks, emptyMessage, showArchiveButton = true }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-700 bg-gray-900/20 p-12 text-center text-gray-500">
        {emptyMessage ?? 'No active tasks yet. Create one above to get started.'}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} showArchiveButton={showArchiveButton} />
      ))}
    </div>
  );
}
