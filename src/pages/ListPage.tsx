import React, { useEffect, useState, useMemo } from "react";
import { fetchPokemonList, fetchPokemon } from "../api/pokemon";
import { Pokemon } from "../types/pokemon";
import SearchBar from "../components/SearchBar";
import SortControls from "../components/SortControls";
import PokemonCard from "../components/PokemonCard";
import { useDebouncedValue } from "../hooks/useDebouncedValue";

export default function ListPage() {
  const [all, setAll] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebouncedValue(query, 200);

  const [sortKey, setSortKey] = useState<"name" | "id" | "weight">("name");
  const [ascending, setAscending] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const list = await fetchPokemonList(50); // first 50 for demo
      const details = await Promise.all(list.results.map(r => fetchPokemon(r.name)));
      setAll(details);
      setLoading(false);
    };
    load();
  }, []);

  const filtered = useMemo(() => {
    return all.filter(p => p.name.toLowerCase().includes(debouncedQuery.toLowerCase()));
  }, [all, debouncedQuery]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    copy.sort((a, b) => {
      let aVal: any, bVal: any;
      if (sortKey === "name") {
        aVal = a.name; bVal = b.name;
        return ascending ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      if (sortKey === "id" || sortKey === "weight") {
        aVal = (a as any)[sortKey]; bVal = (b as any)[sortKey];
        return ascending ? aVal - bVal : bVal - aVal;
      }
      return 0;
    });
    return copy;
  }, [filtered, sortKey, ascending]);

  const ids = sorted.map(p => p.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100 p-6">
      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-blue-700 mb-8 drop-shadow-sm">
        Pokémon List
      </h1>

      {/* Controls */}
      <div className="bg-white shadow-md rounded-xl p-4 mb-6 max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex-1 w-full">
            <SearchBar value={query} onChange={setQuery} />
          </div>
          <SortControls
            sortKey={sortKey}
            ascending={ascending}
            onChangeKey={setSortKey}
            onToggleOrder={() => setAscending(!ascending)}
          />
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-600 animate-pulse">
            Loading Pokémon…
          </p>
        </div>
      ) : sorted.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          No Pokémon found 🫠
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {sorted.map((p) => (
            <PokemonCard key={p.id} pokemon={p} listIds={ids} />
          ))}
        </div>
      )}
    </div>
  );
}