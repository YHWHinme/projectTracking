import type { Task } from './types';

export function filterTasks(tasks: Task[], filter: string, sortBy: string): Task[] {
  let filtered = [...tasks];
  
  if (filter === 'completed') {
    filtered = tasks.filter(task => task.completed);
  } else if (filter === 'pending') {
    filtered = tasks.filter(task => !task.completed);
  } else if (filter === 'high') {
    filtered = tasks.filter(task => task.priority === 'high');
  } else if (filter === 'medium') {
    filtered = tasks.filter(task => task.priority === 'medium');
  } else if (filter === 'low') {
    filtered = tasks.filter(task => task.priority === 'low');
  }
  
  if (sortBy === 'priority') {
    const priorityOrder = { high: 3, medium: 2, low: 1 };
    filtered.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
  }
  
  return filtered;
}

export function calculateProgress(tasks: Task[]): number {
  if (tasks.length === 0) return 0;
  const completed = tasks.filter(task => task.completed).length;
  return Math.round((completed / tasks.length) * 100);
}