"use client";
import { useState } from "react";
import type { Task } from "@/lib/types";

interface TaskItemProps {
  task: Task;
  onUpdate: (task: Task) => void;
  onDelete: (taskTitle: string) => void;
}

function TaskItem({ task, onUpdate, onDelete }: TaskItemProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [editPriority, setEditPriority] = useState<Task['priority']>(task.priority);

  const handleToggleComplete = () => {
    onUpdate({ ...task, completed: !task.completed });
  };

  const handleSaveEdit = () => {
    if (editTitle.trim()) {
      onUpdate({ ...task, title: editTitle.trim(), priority: editPriority });
      setIsEditing(false);
    }
  };

  const handleDelete = () => {
    if (confirm('Delete this task?')) {
      onDelete(task.title);
    }
  };

  return (
    <div className={`flex items-center justify-between p-2 my-1 border rounded ${task.completed ? 'bg-green-100' : 'bg-white'}`}>
      <input type="checkbox" checked={task.completed} onChange={handleToggleComplete} className="mr-2" />

      {isEditing ? (
        <input
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleSaveEdit}
          onKeyDown={(e) => e.key === 'Enter' && handleSaveEdit()}
          className="flex-grow p-1 border rounded"
        />
      ) : (
        <span onClick={() => setIsEditing(true)} className={`flex-grow cursor-pointer ${task.completed ? 'line-through' : ''}`}>
          {task.title}
        </span>
      )}

      {/* Priority selection */}
      {isEditing ? (
        <select
          value={editPriority}
          onChange={(e) => setEditPriority(e.target.value as Task['priority'])} // Update priority on change
          className="ml-2 p-1 border rounded"
        >
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
      ) : (
        <span className="ml-2 px-2 py-0.5 rounded-full text-xs">
          {task.priority}
        </span>
      )}

      {/* Save and Edit buttons */}
      {isEditing ? (
        <button onClick={handleSaveEdit} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)} className="ml-2 px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400">Edit</button>
      )}

      {/* Delete button */}
      <button onClick={handleDelete} className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
    </div>
  );
}

export default TaskItem;
