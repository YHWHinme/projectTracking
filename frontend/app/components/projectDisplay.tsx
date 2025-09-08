import React from "react";
import Link from "next/link";
import { Project } from "@/app/lib/types";
import { mockProjects } from "@/app/lib/mockData";

const ProjectDisplay: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Projects</h1>

      {/* Iterates over the mockProjects array to display each project's details.
      For each project, it prepares data and renders a clickable link. */}
      {mockProjects.map((project: Project) => {
        const projectSlug = encodeURIComponent(project.name);
        // Calculates the number of completed tasks for the current project.
        const completedTasks = project.tasks.filter(
          (task) => task.completed,
        ).length;

        // Renders a clickable link for each project, leading to its detailed page.
        return (
          <Link key={project.name} href={`/projects/${projectSlug}`}>
            <div className="bg-gray-300 shadow-md rounded-lg p-4 mb-4 hover:bg-gray-400 cursor-pointer transition-colors duration-200">
              <h2 className="text-xl font-semibold mb-2">{project.name}</h2>
              <p className="text-sm text-gray-600 mb-3">
                {project.tasks.length} tasks • {completedTasks} completed
              </p>
              <ul>
                {/* // Conditionally renders a message if there are more than 3 
                tasks, indicating how many more. */}
                {project.tasks.length > 3 && (
                  <li className="text-sm text-gray-500 mt-2">
                    +{project.tasks.length - 3} more tasks...
                  </li>
                )}
              </ul>
            </div>
          </Link>
        );
      })}
    </div>
  );
};

export default ProjectDisplay;
