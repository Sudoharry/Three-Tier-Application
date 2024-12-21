import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Task } from '../types/task';
import toast from 'react-hot-toast';

export function useTasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTasks = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('tasks')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setTasks(data || []);
    } catch (error) {
      toast.error('Error loading tasks');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const createTask = async (title: string, description: string) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error('No user found');

      const { data, error } = await supabase
        .from('tasks')
        .insert([{ title, description, user_id: user.id }])
        .select();

      if (error) throw error;
      setTasks([...(data || []), ...tasks]);
      toast.success('Task created successfully');
    } catch (error) {
      toast.error('Error creating task');
      throw error;
    }
  };

  const deleteTask = async (id: string) => {
    try {
      const { error } = await supabase
        .from('tasks')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setTasks(tasks.filter((task) => task.id !== id));
      toast.success('Task deleted successfully');
    } catch (error) {
      toast.error('Error deleting task');
      throw error;
    }
  };

  return {
    tasks,
    loading,
    createTask,
    deleteTask,
  };
}