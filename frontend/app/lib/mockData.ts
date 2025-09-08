import type { Project } from "./types";

export const mockProjects: Project[] = [
  {
    name: "Work Projects",
    tasks: [
      { title: "Finish quarterly report", completed: false, priority: "high" },
      { title: "Update team documentation", completed: true, priority: "medium" },
      { title: "Review pull requests", completed: false, priority: "low" }
    ]
  },
  {
    name: "Personal Projects", 
    tasks: [
      { title: "Grocery shopping", completed: false, priority: "medium" },
      { title: "Clean apartment", completed: true, priority: "low" }
    ]
  },
  {
    name: "Learning",
    tasks: [
      { title: "Complete React tutorial", completed: false, priority: "high" },
      { title: "Read TypeScript docs", completed: false, priority: "medium" }
    ]
  }
];