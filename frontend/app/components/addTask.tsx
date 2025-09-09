"use client";
import { useState } from "react";

interface AddTaskFormProps {
  onTaskCreate: (taskTitle: string, projectName: string) => void;
  currentProjectName: string;
}

function AddTaskForm({ onTaskCreate, currentProjectName }: AddTaskFormProps) {
  const [taskTitle, setTaskTitle] = useState("");

  function handleTaskTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTaskTitle(event.target.value);
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    if (taskTitle.trim()) {
      onTaskCreate(taskTitle.trim(), currentProjectName);
      setTaskTitle("");
    } else {
      alert("Please enter a task title.");
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
          onChange={handleTaskTitleChange}
          value={taskTitle}
          placeholder="Input your task!"
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
        Add Task
      </button>
    </div>
  );
}

export default AddTaskForm;
