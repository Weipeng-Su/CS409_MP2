import React from "react";

type SortKey = "name" | "id" | "weight";

interface Props {
  sortKey: SortKey;
  ascending: boolean;
  onChangeKey: (k: SortKey) => void;
  onToggleOrder: () => void;
}

export default function SortControls({ sortKey, ascending, onChangeKey, onToggleOrder }: Props) {
  return (
    <div className="flex gap-2 mb-4">
      <select value={sortKey} onChange={(e) => onChangeKey(e.target.value as SortKey)}>
        <option value="name">Name</option>
        <option value="id">ID</option>
        <option value="weight">Weight</option>
      </select>
      <button onClick={onToggleOrder}>
        {ascending ? "Ascending ↑" : "Descending ↓"}
      </button>
    </div>
  );
}