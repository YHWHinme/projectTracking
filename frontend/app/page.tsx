import ProjectDisplay from "./components/projectDisplay";
import StorageIndicator from "./components/StorageIndicator";
import ExportButton from "./components/ExportButton";
import ImportButton from "./components/ImportButton";

export default function Home() {
  return (
    <div className="relative min-h-screen">
      {/* Export/Import Controls - Top Right */}
      <div className="absolute top-4 right-4 z-10">
        <div className="flex items-center gap-3">
          {/* Storage Indicator - NOTE: Remove when migrating to database */}
          <StorageIndicator />

          {/* Export/Import Buttons */}
          <div className="flex gap-2">
            <ExportButton />
            <ImportButton />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <ProjectDisplay />
    </div>
  );
}
