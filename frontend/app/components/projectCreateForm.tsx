"use client";
import { useState } from "react";

interface ProjectCreateFormProps {
  onProjectCreate: (projectName: string) => void;
  existingProjects: string[];
}

function ProjectCreateForm({ onProjectCreate, existingProjects }: ProjectCreateFormProps) {
  const [projectName, setProjectName] = useState("");

  function handleProjectNameChange(event: React.ChangeEvent<HTMLInputElement>) {
    setProjectName(event.target.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const trimmedName = projectName.trim();
    if (trimmedName) {
      if (existingProjects.includes(trimmedName)) {
        alert("Project name already exists. Please choose a different name.");
      } else {
        onProjectCreate(trimmedName);
        setProjectName("");
        alert(`Project "${trimmedName}" created successfully!`);
      }
    } else {
      alert("Please enter a project name.");
    }
  }

  return (
    <div
      className="
			flex justify-center
			mx-10 my-1 p-1
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
          onChange={handleProjectNameChange}
          value={projectName}
          placeholder="Enter project name!"
        />
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
        Create Project
      </button>
    </div>
  );
}

export default ProjectCreateForm;