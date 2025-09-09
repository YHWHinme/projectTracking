import type { Project } from "./types";
import { mockProjects } from "./mockData";
import { saveProjects, loadProjects, isStorageAvailable } from "./storage";

const MIGRATION_FLAG_KEY = "projectTracking_migrated";
const MIGRATION_VERSION_KEY = "projectTracking_migration_version";
const CURRENT_MIGRATION_VERSION = "1.0";

/**
 * Checks if migration has been completed
 */
export function isMigrated(): boolean {
  try {
    return localStorage.getItem(MIGRATION_FLAG_KEY) === "true";
  } catch {
    return false;
  }
}

/**
 * Marks migration as completed
 */
function markMigrated(): void {
  try {
    localStorage.setItem(MIGRATION_FLAG_KEY, "true");
    localStorage.setItem(MIGRATION_VERSION_KEY, CURRENT_MIGRATION_VERSION);
  } catch (error) {
    console.warn("Failed to mark migration as completed:", error);
  }
}

/**
 * Performs initial migration from mock data to localStorage
 */
export function performInitialMigration(): Project[] {
  console.log("Performing initial data migration...");

  try {
    // Check if storage is available
    if (!isStorageAvailable()) {
      console.warn("localStorage not available, using mock data");
      return mockProjects;
    }

    // Check if already migrated
    if (isMigrated()) {
      console.log("Migration already completed, loading from storage");
      return loadProjects();
    }

    // Perform migration
    console.log("Migrating mock data to localStorage");
    saveProjects(mockProjects);
    markMigrated();

    console.log("Migration completed successfully");
    return mockProjects;
  } catch (error) {
    console.error("Migration failed:", error);
    console.log("Falling back to mock data");
    return mockProjects;
  }
}

/**
 * Gets the initial projects data, either from storage or after migration
 */
export function getInitialProjects(): Project[] {
  try {
    if (!isStorageAvailable()) {
      console.warn("localStorage not available, using mock data");
      return mockProjects;
    }

    // Check if we have stored data
    const storedProjects = loadProjects();
    if (storedProjects.length > 0) {
      console.log("Loaded projects from localStorage");
      return storedProjects;
    }

    // No stored data, perform migration
    return performInitialMigration();
  } catch (error) {
    console.error("Failed to get initial projects:", error);
    console.log("Falling back to mock data");
    return mockProjects;
  }
}

/**
 * Resets migration state (useful for testing or manual reset)
 */
export function resetMigration(): void {
  try {
    localStorage.removeItem(MIGRATION_FLAG_KEY);
    localStorage.removeItem(MIGRATION_VERSION_KEY);
    console.log("Migration state reset");
  } catch (error) {
    console.error("Failed to reset migration:", error);
  }
}

/**
 * Validates project data structure
 */
export function validateProjects(projects: unknown[]): projects is Project[] {
  if (!Array.isArray(projects)) {
    return false;
  }

    return projects.every(project =>
      project &&
      typeof project === 'object' &&
      typeof (project as Record<string, unknown>).name === 'string' &&
      Array.isArray((project as Record<string, unknown>).tasks) &&
      ((project as Record<string, unknown>).tasks as unknown[]).every((task: unknown) =>
        task &&
        typeof task === 'object' &&
        typeof (task as Record<string, unknown>).title === 'string' &&
        typeof (task as Record<string, unknown>).completed === 'boolean' &&
        ['high', 'medium', 'low'].includes((task as Record<string, unknown>).priority as string)
      )
    );
}