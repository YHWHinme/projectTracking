"use client";
import { getStorageInfo, isStorageNearCapacity } from "@/app/lib/storage";

export default function StorageIndicator() {
  const storageInfo = getStorageInfo();

  if (!storageInfo) {
    return null;
  }

  const { percentage, used } = storageInfo;
  const isNearCapacity = isStorageNearCapacity();
  const usedMB = (used / 1024 / 1024).toFixed(2);

  return (
    <div
      className={`px-3 py-1 rounded-full text-sm font-medium ${
        isNearCapacity
          ? 'bg-red-100 text-red-800 border border-red-200'
          : percentage > 60
          ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
          : 'bg-gray-100 text-gray-600 border border-gray-200'
      }`}
      title={`Storage: ${percentage}% used (${usedMB}MB)`}
    >
      <span className="flex items-center gap-1">
        <span>💾</span>
        <span>{percentage}%</span>
        {isNearCapacity && <span>⚠️</span>}
      </span>
    </div>
  );
}