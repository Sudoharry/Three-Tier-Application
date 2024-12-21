import React from 'react';
import { Trash2, Circle, CheckCircle } from 'lucide-react';
import { Task } from '../../types/task';
import { AppleButton } from '../ui/AppleButton';
import { AppleCard } from '../ui/AppleCard';

interface TaskCardProps {
  task: Task;
  onDelete: (id: string) => void;
}

export function TaskCard({ task, onDelete }: TaskCardProps) {
  return (
    <AppleCard className="bg-surface hover:bg-surface-secondary transition-colors duration-200">
      <div className="flex justify-between items-start gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {task.status === 'completed' ? (
              <CheckCircle className="h-5 w-5 text-success" />
            ) : (
              <Circle className="h-5 w-5 text-secondary" />
            )}
            <h3 className="text-lg font-semibold text-primary">{task.title}</h3>
          </div>
          {task.description && (
            <p className="text-secondary mb-3">{task.description}</p>
          )}
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-neutral text-secondary">
            {task.status}
          </span>
        </div>
        <AppleButton
          variant="ghost"
          icon={Trash2}
          onClick={() => onDelete(task.id)}
          className="text-error"
          aria-label="Delete task"
        >
          Delete
        </AppleButton>
      </div>
    </AppleCard>
  );
}