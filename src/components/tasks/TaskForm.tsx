import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { AppleButton } from '../ui/AppleButton';
import { AppleInput } from '../ui/AppleInput';

interface TaskFormProps {
  onSubmit: (title: string, description: string) => Promise<void>;
}

export function TaskForm({ onSubmit }: TaskFormProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(title, description);
    setTitle('');
    setDescription('');
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <AppleInput
        label="Task Title"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      
      <div className="space-y-1">
        <label className="block text-sm font-medium text-primary">
          Description (optional)
        </label>
        <textarea
          placeholder="Add more details about this task..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-[#f5f5f7] border border-border
            focus:border-accent focus:ring-1 focus:ring-accent
            placeholder:text-secondary transition-colors duration-200
            resize-none"
          rows={3}
        />
      </div>
      
      <AppleButton type="submit" icon={Plus}>
        Add Task
      </AppleButton>
    </form>
  );
}