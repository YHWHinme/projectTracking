import type { Project } from "./types";

const STORAGE_KEY = "projectTracking_projects";
const STORAGE_VERSION = "1.0";

interface StorageData {
  version: string;
  projects: Project[];
  lastUpdated: string;
}

export class StorageError extends Error {
  constructor(message: string, public originalError?: Error) {
    super(message);
    this.name = "StorageError";
  }
}

/**
 * Saves projects to localStorage with error handling
 */
export function saveProjects(projects: Project[]): void {
  try {
    const data: StorageData = {
      version: STORAGE_VERSION,
      projects: JSON.parse(JSON.stringify(projects)), // Deep clone
      lastUpdated: new Date().toISOString(),
    };

    const serialized = JSON.stringify(data);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      throw new StorageError("Storage quota exceeded. Please clear some data or use a different browser.", error);
    }
    throw new StorageError("Failed to save projects to localStorage", error as Error);
  }
}

/**
 * Loads projects from localStorage with error handling
 */
export function loadProjects(): Project[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return [];
    }

    const data: StorageData = JSON.parse(stored);

    // Basic validation
    if (!data.projects || !Array.isArray(data.projects)) {
      console.warn("Invalid data structure in localStorage, returning empty array");
      return [];
    }

    return data.projects;
  } catch (error) {
    console.error("Failed to load projects from localStorage:", error);
    throw new StorageError("Failed to load projects from localStorage", error as Error);
  }
}

/**
 * Checks if localStorage is available
 */
export function isStorageAvailable(): boolean {
  try {
    const test = "__storage_test__";
    localStorage.setItem(test, test);
    localStorage.removeItem(test);
    return true;
  } catch {
    return false;
  }
}

/**
 * Clears all stored project data
 */
export function clearProjects(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    throw new StorageError("Failed to clear projects from localStorage", error as Error);
  }
}

/**
 * Gets storage usage information
 */
export function getStorageInfo(): { used: number; available: number; percentage: number } | null {
  try {
    // Estimate storage usage (rough approximation)
    const stored = localStorage.getItem(STORAGE_KEY);
    const used = stored ? new Blob([stored]).size : 0;

    // localStorage typically has 5-10MB limit
    const available = 5 * 1024 * 1024; // 5MB estimate
    const percentage = (used / available) * 100;

    return { used, available, percentage };
  } catch {
    return null;
  }
}

/**
 * Checks if storage is nearing capacity
 */
export function isStorageNearCapacity(): boolean {
  const info = getStorageInfo();
  return info ? info.percentage > 80 : false;
}

/**
 * Shows a storage warning notification to the user
 * NOTE: Remove when migrating to database
 */
export function showStorageWarning(): void {
  const info = getStorageInfo();
  if (!info) return;

  const message = `Storage is ${info.percentage}% full (${(info.used / 1024 / 1024).toFixed(2)}MB used). Consider exporting data and clearing old projects.`;

  // Use browser alert for now - could be replaced with a proper notification system
  alert(`⚠️ Storage Warning\n\n${message}`);
}

/**
 * Handles localStorage quota exceeded errors
 * NOTE: Remove when migrating to database
 */
export function handleQuotaExceeded(): void {
  const message = "Storage quota exceeded! Please export your data and clear some projects to free up space.";
  alert(`❌ Storage Full\n\n${message}`);
}

/**
 * Gets detailed storage information for debugging
 * NOTE: Remove when migrating to database
 */
export function getStorageDetails(): {
  totalKeys: number;
  largestKey: string;
  largestSize: number;
  totalSize: number;
} | null {
  try {
    let totalSize = 0;
    let largestSize = 0;
    let largestKey = '';
    let totalKeys = 0;

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (!key) continue;

      const value = localStorage.getItem(key) || '';
      const size = new Blob([value]).size;

      totalSize += size;
      totalKeys++;

      if (size > largestSize) {
        largestSize = size;
        largestKey = key;
      }
    }

    return {
      totalKeys,
      largestKey,
      largestSize,
      totalSize
    };
  } catch {
    return null;
  }
}