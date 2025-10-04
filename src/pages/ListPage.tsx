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
    <div className="p-4">
      <h1 className="text-2xl mb-4">Pokémon List</h1>
      <SearchBar value={query} onChange={setQuery} />
      <SortControls
        sortKey={sortKey}
        ascending={ascending}
        onChangeKey={setSortKey}
        onToggleOrder={() => setAscending(!ascending)}
      />
      {loading ? <p>Loading…</p> :
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {sorted.map(p => <PokemonCard key={p.id} pokemon={p} listIds={ids} />)}
        </div>
      }
    </div>
  );
}