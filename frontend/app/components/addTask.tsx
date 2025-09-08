"use client";
import { useState } from "react";
import { mockProjects} from "@/lib/mockData";
import type { Project } from "@/lib/types";

interface AddTaskFormProps {
  onTaskCreate: (taskTitle: string, projectName: string) => void;
}

function AddTaskForm({ onTaskCreate }: AddTaskFormProps) {
  const [taskTitle, setTaskTitle] = useState("");
  const [selectedProject, setSelectedProject] = useState(
    mockProjects.length > 0 ? mockProjects[0].name : ""
  );

  function handleTaskTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTaskTitle(event.target.value);
  }

  function handleProjectChange(event: React.ChangeEvent<HTMLSelectElement>) {
    setSelectedProject(event.target.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (taskTitle.trim() && selectedProject) {
      onTaskCreate(taskTitle.trim(), selectedProject);
      setTaskTitle("");
    } else {
      alert("Please enter a task and select a project.");
    }
  }

  return (
    <div
      className="
			flex justify-center items-center w-full
			mx-100 my-1 p-1
			border-1 rounded-2xl
			bg-white
			"
    >
      {/* The text box */}
      <div
        className="border-1 rounded-2xl
				mx-2
				flex
			"
      >
        {/* The actual input box */}
        <input
          className="
					text-center
					py-1
					"
          type="text"
          onChange={handleTaskTitleChange}
          value={taskTitle}
          placeholder="Input your task!"
        />
      </div>
      {/* Dropdown for projects */}
      <div
        className="border-1 rounded-2xl
				mx-2
				flex
			"
      >
        <select
          className="
					text-center
					py-1
					"
          onChange={handleProjectChange}
          value={selectedProject}
        >
          {mockProjects.map((project: Project) => (
            <option key={project.name} value={project.name}>
              {project.name}
            </option>
          ))}
        </select>
      </div>
      {/* The button to submit it */}
      <button
        type="submit"
        onClick={handleSubmit}
        className="
				border-2 border-black rounded-lg bg-black text-white hover:cursor-pointer
				px-2 py-1
				"
      >
        Add Task
      </button>
    </div>
  );
}

export default AddTaskForm;
