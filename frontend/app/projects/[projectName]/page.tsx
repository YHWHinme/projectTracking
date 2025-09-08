"use client";
import { useState, useEffect } from "react";
import { mockProjects } from "@/lib/mockData";
import type { Task, Project } from "@/lib/types";
import AddTaskForm from "@/app/components/addTask";
import { filterTasks, calculateProgress } from "@/app/lib/taskUtils";

// Placeholder components for now
function ProjectHeader({ name, progress }: { name: string; progress: number }) {
  return (
    <div className="text-center my-4">
      <h1 className="text-3xl font-bold">{name}</h1>
      <p className="text-lg">Progress: {progress}%</p>
    </div>
  );
}

function TaskFilters({ filter, onFilterChange, sortBy, onSortChange }: any) {
  return (
    <div className="flex justify-center space-x-4 my-4">
      <div>
        <label htmlFor="filter">Filter:</label>
        <select id="filter" value={filter} onChange={(e) => onFilterChange(e.target.value)} className="ml-2 p-1 border rounded">
          <option value="all">All Tasks</option>
          <option value="pending">Pending</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      <div>
        <label htmlFor="sortBy">Sort by:</label>
        <select id="sortBy" value={sortBy} onChange={(e) => onSortChange(e.target.value)} className="ml-2 p-1 border rounded">
          <option value="priority">Priority</option>
        </select>
      </div>
    </div>
  );
}

function TaskItem({ task, onUpdate, onDelete }: { task: Task; onUpdate: (task: Task) => void; onDelete: (taskTitle: string) => void }) {
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
          onKeyPress={(e) => e.key === 'Enter' && handleSaveEdit()}
          className="flex-grow p-1 border rounded"
        />
      ) : (
        <span onClick={() => setIsEditing(true)} className={`flex-grow cursor-pointer ${task.completed ? 'line-through' : ''}`}>
          {task.title}
        </span>
      )}
      
      <select 
        value={editPriority} 
        onChange={(e) => setEditPriority(e.target.value as Task['priority'])} 
        disabled={!isEditing}
        className="ml-2 p-1 border rounded"
      >
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
      
      {isEditing ? (
        <button onClick={handleSaveEdit} className="ml-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600">Save</button>
      ) : (
        <button onClick={() => setIsEditing(true)} className="ml-2 px-3 py-1 bg-gray-300 text-black rounded hover:bg-gray-400">Edit</button>
      )}
      
      <button onClick={handleDelete} className="ml-2 px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600">Delete</button>
    </div>
  );
}

function TaskList({ tasks, onUpdate, onDelete }: { tasks: Task[]; onUpdate: (task: Task) => void; onDelete: (taskTitle: string) => void }) {
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


export default function ProjectPage({ params }: { params: { projectName: string } }) {
  const projectName = decodeURIComponent(params.projectName);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('priority');

  useEffect(() => {
    const project = mockProjects.find((p: Project) => p.name === projectName);
    if (project) {
      setTasks(project.tasks);
    }
  }, [projectName]);

  const handleTaskCreate = (taskTitle: string, assignedProjectName: string) => {
    if (assignedProjectName === projectName) {
      const newTask: Task = { title: taskTitle, completed: false, priority: 'medium' }; // Default priority
      setTasks(prevTasks => [...prevTasks, newTask]);
    } else {
      alert(`Task "${taskTitle}" will be added to "${assignedProjectName}". This page only displays tasks for "${projectName}".`);
      // In a real app, you'd update the mockProjects array or a global state here
    }
  };

  const handleTaskUpdate = (updatedTask: Task) => {
    setTasks(prevTasks => prevTasks.map(task => 
      task.title === updatedTask.title ? updatedTask : task
    ));
  };

  const handleTaskDelete = (taskTitle: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.title !== taskTitle));
  };

  const filteredTasks = filterTasks(tasks, filter, sortBy);
  const progress = calculateProgress(tasks);

  return (
    <div className="container mx-auto p-4">
      <ProjectHeader name={projectName} progress={progress} />
      <AddTaskForm onTaskCreate={handleTaskCreate} />
      <TaskFilters filter={filter} onFilterChange={setFilter} sortBy={sortBy} onSortChange={setSortBy} />
      <TaskList tasks={filteredTasks} onUpdate={handleTaskUpdate} onDelete={handleTaskDelete} />
    </div>
  );
}

