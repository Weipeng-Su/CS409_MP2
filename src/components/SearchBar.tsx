import React from "react";

interface Props {
  value: string;
  onChange: (val: string) => void;
}

export default function SearchBar({ value, onChange }: Props) {
  return (
    <div className="w-full">
      <input
        type="text"
        placeholder="Search Pokémon..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="
          w-full 
          px-4 py-2 
          border border-gray-300 
          rounded-xl 
          shadow-sm 
          focus:outline-none 
          focus:ring-2 focus:ring-blue-400 
          focus:border-blue-400 
          placeholder-gray-400
          transition
        "
      />
    </div>
  );
}