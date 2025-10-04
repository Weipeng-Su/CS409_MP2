import React, { useEffect, useState } from "react";
import { fetchPokemonList, fetchPokemon } from "../api/pokemon";
import { Pokemon } from "../types/pokemon";
import PokemonCard from "../components/PokemonCard";

export default function GalleryPage() {
  const [all, setAll] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  useEffect(() => {
    const load = async () => {
      const list = await fetchPokemonList(50);
      const details = await Promise.all(list.results.map(r => fetchPokemon(r.name)));
      setAll(details);
      setLoading(false);
    };
    load();
  }, []);

  const toggleType = (type: string) => {
    setSelectedTypes(prev =>
      prev.includes(type) ? prev.filter(t => t !== type) : [...prev, type]
    );
  };

  const allTypes = Array.from(new Set(all.flatMap(p => p.types.map(t => t.type.name))));

  const filtered = selectedTypes.length === 0
    ? all
    : all.filter(p => selectedTypes.every(t => p.types.some(pt => pt.type.name === t)));

  const ids = filtered.map(p => p.id);

  return (
    <div className="p-4">
      <h1 className="text-2xl mb-4">Pokémon Gallery</h1>
      <div className="flex flex-wrap gap-2 mb-4">
        {allTypes.map(t => (
          <button
            key={t}
            className={`px-2 py-1 rounded border ${selectedTypes.includes(t) ? "bg-blue-200" : ""}`}
            onClick={() => toggleType(t)}
          >
            {t}
          </button>
        ))}
      </div>
      {loading ? <p>Loading…</p> :
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {filtered.map(p => <PokemonCard key={p.id} pokemon={p} listIds={ids} />)}
        </div>
      }
    </div>
  );
}