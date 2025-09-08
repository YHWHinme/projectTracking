"use client";
import type { Task } from "@/lib/types";
import TaskItem from "./TaskItem";

interface TaskListProps {
  tasks: Task[];
  onUpdate: (task: Task) => void;
  onDelete: (taskTitle: string) => void;
}

function TaskList({ tasks, onUpdate, onDelete }: TaskListProps) {
  return (
    <div className="max-w-2xl mx-auto mt-4">
      {tasks.length === 0 ? (
        <p className="text-center text-gray-500">No tasks found.</p>
      ) : (
        tasks.map(task => (
          <TaskItem
            key={task.title}
            task={task}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))
      )}
    </div>
  );
}

export default TaskList;
