import { Task } from '@/lib/types';
import { TaskCard } from './TaskCard';

interface TaskListProps {
  tasks: Task[];
}

export function TaskList({ tasks }: TaskListProps) {
  if (tasks.length === 0) {
    return (
      <div className="rounded-2xl border border-dashed border-slate-700 bg-slate-800/50 p-10 text-center text-slate-400">
        No active tasks yet. Create one above to get started.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
