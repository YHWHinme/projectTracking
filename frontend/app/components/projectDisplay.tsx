import React from "react";
import { Project, Task } from "@/app/lib/types";
import { mockProjects } from "@/app/lib/mockData";

const ProjectDisplay: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Projects</h1>
      {mockProjects.map((project: Project) => (
        <div
          key={project.name}
          className="bg-gray-300 shadow-md rounded-lg p-4 mb-4"
        >
          <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
          <ul>
            {project.tasks.map((task: Task, index: number) => (
              <li key={index} className="flex items-center mb-1">
                <input
                  type="checkbox"
                  checked={task.completed}
                  readOnly
                  className="mr-2"
                />
                <span
                  className={`${task.completed ? "line-through text-gray-500" : ""}`}
                >
                  {task.title}
                </span>
                <span
                  className={`ml-2 px-2 py-0.5 rounded-full text-xs
                    ${task.priority === "high" ? "bg-red-200 text-red-800" : ""}
                    ${task.priority === "medium" ? "bg-yellow-200 text-yellow-800" : ""}
                    ${task.priority === "low" ? "bg-green-200 text-green-800" : ""}
                  `}
                >
                  {task.priority}
                </span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ProjectDisplay;
