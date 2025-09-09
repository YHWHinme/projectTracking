"use client";
import { useProjects } from "@/app/lib/ProjectContext";
import type { Project } from "@/app/lib/types";

interface ImportData {
  version?: string;
  exportedAt?: string;
  projects: Project[];
  storageInfo?: {
    percentage: number;
    usedMB: string;
  }; // NOTE: Remove when migrating to database
}

export default function ImportButton() {
  const { actions } = useProjects();

  const validateImportData = (data: unknown): data is ImportData => {
    const obj = data as Record<string, unknown>;
    return (
      obj &&
      typeof obj === 'object' &&
      Array.isArray(obj.projects) &&
      obj.projects.every((project: unknown) =>
        project &&
        typeof project === 'object' &&
        typeof (project as Record<string, unknown>).name === 'string' &&
        Array.isArray((project as Record<string, unknown>).tasks)
      )
    );
  };

  const mergeProjects = (existingProjects: Project[], importedProjects: Project[]): Project[] => {
    const merged = [...existingProjects];
    const existingNames = new Set(existingProjects.map(p => p.name));

    importedProjects.forEach(importedProject => {
      if (existingNames.has(importedProject.name)) {
        // Handle conflict - append "(Imported)" to name
        const newName = `${importedProject.name} (Imported)`;
        merged.push({
          ...importedProject,
          name: newName
        });
      } else {
        merged.push(importedProject);
      }
    });

    return merged;
  };

  const handleImport = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.style.display = 'none';

    input.onchange = async (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;

      try {
        const text = await file.text();
        const importData = JSON.parse(text);

        if (!validateImportData(importData)) {
          alert('❌ Invalid file format. Please select a valid project tracking backup file.');
          return;
        }

        const existingProjects = actions.getAllProjects();
        const mergedProjects = mergeProjects(existingProjects, importData.projects);

        // Show confirmation dialog
        const confirmed = confirm(
          `Import ${importData.projects.length} project(s)?\n\n` +
          `This will add ${mergedProjects.length - existingProjects.length} new project(s).\n\n` +
          `Continue?`
        );

        if (!confirmed) return;

        // Update global state with merged projects
        mergedProjects.forEach(project => {
          if (!existingProjects.find(p => p.name === project.name)) {
            actions.addProject(project.name);
            // Add tasks for the new project
            project.tasks.forEach(task => {
              actions.addTask(project.name, task);
            });
          }
        });

        alert(`✅ Successfully imported ${importData.projects.length} project(s)!`);

      } catch (error) {
        console.error('Import failed:', error);
        alert('❌ Import failed. Please check the file format and try again.');
      }
    };

    input.click();
  };

  return (
    <button
      onClick={handleImport}
      className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors shadow-md flex items-center gap-2"
      title="Import projects and tasks from JSON file"
    >
      <span>📤</span>
      <span className="hidden sm:inline">Import Data</span>
      <span className="sm:hidden">Import</span>
    </button>
  );
}