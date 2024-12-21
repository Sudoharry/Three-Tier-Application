import React from 'react';
import { LogOut, Plus } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { useAuth } from '../hooks/useAuth';
import { TaskForm } from './tasks/TaskForm';
import { TaskCard } from './tasks/TaskCard';
import { AppleButton } from './ui/AppleButton';
import { AppleCard } from './ui/AppleCard';

export function TaskList() {
  const { tasks, loading, createTask, deleteTask } = useTasks();
  const { signOut, user } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-accent border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-surface border-b border-border">
        <div className="max-w-4xl mx-auto p-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-4xl font-semibold text-primary">Task Flow</h1>
              <p className="text-secondary mt-1">Welcome back, {user?.email}</p>
            </div>
            <AppleButton variant="ghost" icon={LogOut} onClick={signOut}>
              Sign Out
            </AppleButton>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        <AppleCard className="bg-surface-secondary">
          <div className="flex items-center gap-3 mb-4">
            <Plus className="text-accent h-5 w-5" />
            <h2 className="text-xl font-semibold text-primary">Create New Task</h2>
          </div>
          <TaskForm onSubmit={createTask} />
        </AppleCard>

        <div className="space-y-4">
          {tasks.length === 0 ? (
            <AppleCard className="bg-surface-secondary">
              <div className="text-center py-8">
                <Plus className="mx-auto h-12 w-12 text-secondary" />
                <h3 className="mt-4 text-lg font-medium text-primary">No tasks yet</h3>
                <p className="mt-2 text-secondary">Get started by creating your first task above.</p>
              </div>
            </AppleCard>
          ) : (
            tasks.map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onDelete={deleteTask}
              />
            ))
          )}
        </div>
      </main>
    </div>
  );
}