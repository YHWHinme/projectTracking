"use client";
import React, { createContext, useContext, useReducer, useEffect, ReactNode } from "react";
import type { Project, Task } from "./types";
import { saveProjects, isStorageNearCapacity, showStorageWarning, handleQuotaExceeded } from "./storage";
import { getInitialProjects } from "./migration";

interface ProjectState {
  projects: Project[];
  isLoading: boolean;
  error: string | null;
}

type ProjectAction =
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string | null }
  | { type: "SET_PROJECTS"; payload: Project[] }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "UPDATE_PROJECT"; payload: { name: string; project: Project } }
  | { type: "DELETE_PROJECT"; payload: string }
  | { type: "ADD_TASK"; payload: { projectName: string; task: Task } }
  | { type: "UPDATE_TASK"; payload: { projectName: string; oldTitle: string; task: Task } }
  | { type: "DELETE_TASK"; payload: { projectName: string; taskTitle: string } };

interface ProjectContextType {
  state: ProjectState;
  actions: {
    addProject: (name: string) => void;
    updateProject: (name: string, project: Project) => void;
    deleteProject: (name: string) => void;
    addTask: (projectName: string, task: Task) => void;
    updateTask: (projectName: string, oldTitle: string, task: Task) => void;
    deleteTask: (projectName: string, taskTitle: string) => void;
    getProject: (name: string) => Project | undefined;
    getAllProjects: () => Project[];
  };
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

function projectReducer(state: ProjectState, action: ProjectAction): ProjectState {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.payload };

    case "SET_ERROR":
      return { ...state, error: action.payload, isLoading: false };

    case "SET_PROJECTS":
      return { ...state, projects: action.payload, isLoading: false, error: null };

    case "ADD_PROJECT":
      const newProjects = [...state.projects, action.payload];
      return { ...state, projects: newProjects };

    case "UPDATE_PROJECT":
      const updatedProjects = state.projects.map(project =>
        project.name === action.payload.name ? action.payload.project : project
      );
      return { ...state, projects: updatedProjects };

    case "DELETE_PROJECT":
      const filteredProjects = state.projects.filter(project => project.name !== action.payload);
      return { ...state, projects: filteredProjects };

    case "ADD_TASK":
      const projectsWithNewTask = state.projects.map(project =>
        project.name === action.payload.projectName
          ? { ...project, tasks: [...project.tasks, action.payload.task] }
          : project
      );
      return { ...state, projects: projectsWithNewTask };

    case "UPDATE_TASK":
      const projectsWithUpdatedTask = state.projects.map(project =>
        project.name === action.payload.projectName
          ? {
              ...project,
              tasks: project.tasks.map(task =>
                task.title === action.payload.oldTitle ? action.payload.task : task
              )
            }
          : project
      );
      return { ...state, projects: projectsWithUpdatedTask };

    case "DELETE_TASK":
      const projectsWithDeletedTask = state.projects.map(project =>
        project.name === action.payload.projectName
          ? {
              ...project,
              tasks: project.tasks.filter(task => task.title !== action.payload.taskTitle)
            }
          : project
      );
      return { ...state, projects: projectsWithDeletedTask };

    default:
      return state;
  }
}

export function ProjectProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(projectReducer, {
    projects: [],
    isLoading: true,
    error: null,
  });

  // Load initial data
  useEffect(() => {
    const loadInitialData = async () => {
      try {
        dispatch({ type: "SET_LOADING", payload: true });
        const initialProjects = getInitialProjects();
        dispatch({ type: "SET_PROJECTS", payload: initialProjects });
      } catch (error) {
        console.error("Failed to load initial data:", error);
        dispatch({ type: "SET_ERROR", payload: "Failed to load project data" });
      }
    };

    loadInitialData();
  }, []);

  // Auto-save to localStorage whenever projects change
  // NOTE: Remove storage monitoring when migrating to database
  useEffect(() => {
    if (state.projects.length > 0 && !state.isLoading) {
      try {
        if (isStorageNearCapacity()) {
          console.warn("Storage is nearing capacity");
          // Show user warning - NOTE: Remove when migrating to database
          showStorageWarning();
        }
        saveProjects(state.projects);
      } catch (error) {
        console.error("Failed to save projects:", error);

        // Check if it's a quota exceeded error
        // NOTE: Remove when migrating to database
        if (error instanceof Error && error.message.includes("QuotaExceededError")) {
          handleQuotaExceeded();
          dispatch({ type: "SET_ERROR", payload: "Storage quota exceeded. Please export data and clear some projects." });
        } else {
          dispatch({ type: "SET_ERROR", payload: "Failed to save changes" });
        }
      }
    }
  }, [state.projects, state.isLoading]);

  const actions = {
    addProject: (name: string) => {
      const newProject: Project = {
        name: name.trim(),
        tasks: [],
      };
      dispatch({ type: "ADD_PROJECT", payload: newProject });
    },

    updateProject: (name: string, project: Project) => {
      dispatch({ type: "UPDATE_PROJECT", payload: { name, project } });
    },

    deleteProject: (name: string) => {
      dispatch({ type: "DELETE_PROJECT", payload: name });
    },

    addTask: (projectName: string, task: Task) => {
      dispatch({ type: "ADD_TASK", payload: { projectName, task } });
    },

    updateTask: (projectName: string, oldTitle: string, task: Task) => {
      dispatch({ type: "UPDATE_TASK", payload: { projectName, oldTitle, task } });
    },

    deleteTask: (projectName: string, taskTitle: string) => {
      dispatch({ type: "DELETE_TASK", payload: { projectName, taskTitle } });
    },

    getProject: (name: string) => {
      return state.projects.find(project => project.name === name);
    },

    getAllProjects: () => {
      return state.projects;
    },
  };

  const contextValue: ProjectContextType = {
    state,
    actions,
  };

  return (
    <ProjectContext.Provider value={contextValue}>
      {children}
    </ProjectContext.Provider>
  );
}

export function useProjects() {
  const context = useContext(ProjectContext);
  if (context === undefined) {
    throw new Error("useProjects must be used within a ProjectProvider");
  }
  return context;
}

// Convenience hooks
export function useProjectActions() {
  const { actions } = useProjects();
  return actions;
}

export function useProjectState() {
  const { state } = useProjects();
  return state;
}