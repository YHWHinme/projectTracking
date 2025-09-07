export interface Task {
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
}

export interface Project {
  name: string;
  tasks: Task[];
}
