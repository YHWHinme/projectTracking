"use client";
import { useProjects } from "@/app/lib/ProjectContext";
import { getStorageInfo } from "@/app/lib/storage";

export default function ExportButton() {
  const { state } = useProjects();

  const handleExport = () => {
    try {
      if (state.isLoading) {
        alert("Please wait for data to load before exporting.");
        return;
      }

      const storageInfo = getStorageInfo();
      const exportData = {
        version: "1.0",
        exportedAt: new Date().toISOString(),
        projects: state.projects,
        // NOTE: Remove storageInfo when migrating to database
        storageInfo: storageInfo ? {
          percentage: storageInfo.percentage,
          usedMB: (storageInfo.used / 1024 / 1024).toFixed(2)
        } : null
      };

      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: 'application/json' });

      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `project-tracking-backup-${new Date().toISOString().split('T')[0]}.json`;

      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      alert('✅ Data exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('❌ Export failed. Please try again.');
    }
  };

  return (
    <button
      onClick={handleExport}
      disabled={state.isLoading}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-blue-300 disabled:cursor-not-allowed transition-colors shadow-md flex items-center gap-2"
      title="Export all projects and tasks to JSON file"
    >
      <span>📥</span>
      <span className="hidden sm:inline">Export Data</span>
      <span className="sm:hidden">Export</span>
    </button>
  );
}