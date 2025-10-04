import React from "react";

type SortKey = "name" | "id" | "weight";

interface Props {
  sortKey: SortKey;
  ascending: boolean;
  onChangeKey: (k: SortKey) => void;
  onToggleOrder: () => void;
}

export default function SortControls({
  sortKey,
  ascending,
  onChangeKey,
  onToggleOrder,
}: Props) {
  return (
    <div className="flex items-center gap-3">
      {/* Dropdown */}
      <select
        value={sortKey}
        onChange={(e) => onChangeKey(e.target.value as SortKey)}
        className="px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-gray-700"
      >
        <option value="name">Name</option>
        <option value="id">ID</option>
        <option value="weight">Weight</option>
      </select>

      {/* Toggle Button */}
      <button
        onClick={onToggleOrder}
        className="px-4 py-2 rounded-lg font-medium bg-blue-500 text-white hover:bg-blue-600 transition-colors shadow-sm"
      >
        {ascending ? "Ascending ↑" : "Descending ↓"}
      </button>
    </div>
  );
}