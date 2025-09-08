"use client";
import { useState, useEffect } from "react";

function AddTaskForm() {
  // TODO: Set the value into the state
  const [formValue, setformValue] = useState("");
  function handleInputChange(event) {
    setformValue(event.target.value);
  }
  function handleSubmit() {
    alert(formValue + " was your anwser");
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
          onChange={handleInputChange}
          value={formValue}
          onSubmit={handleSubmit}
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
