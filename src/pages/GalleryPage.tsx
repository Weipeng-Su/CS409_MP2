import React, { useEffect, useState } from "react";
import { fetchPokemonList, fetchPokemon } from "../api/pokemon";
import { Pokemon } from "../types/pokemon";
import PokemonCard from "../components/PokemonCard";
import { useNavigate } from "react-router-dom";

export default function GalleryPage() {
  const navigate = useNavigate();
  const [all, setAll] = useState<Pokemon[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedType, setSelectedType] = useState<string | null>(null); // single type

  useEffect(() => {
    const load = async () => {
      const list = await fetchPokemonList(50);
      const details = await Promise.all(list.results.map((r) => fetchPokemon(r.name)));
      setAll(details);
      setLoading(false);
    };
    load();
  }, []);

  const selectType = (type: string) => {
    setSelectedType((prev) => (prev === type ? null : type)); // toggle single type
  };

  const allTypes = Array.from(new Set(all.flatMap((p) => p.types.map((t) => t.type.name))));

  const filtered = selectedType
    ? all.filter((p) => p.types.some((pt) => pt.type.name === selectedType))
    : all;

  const ids = filtered.map((p) => p.id);

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 to-pink-100 p-6">
      {/* Return Button */}
      <button
        onClick={() => navigate("/")}
        className="mb-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition"
      >
        ← Return to Home
      </button>

      {/* Title */}
      <h1 className="text-4xl font-bold text-center text-pink-700 mb-8 drop-shadow-sm">
        Pokémon Gallery
      </h1>

      {/* Type Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {allTypes.map((t) => (
          <button
            key={t}
            onClick={() => selectType(t)}
            className={`
              px-3 py-1 rounded-full border font-medium text-sm
              transition
              ${selectedType === t
                ? "bg-blue-400 text-white border-blue-400 shadow-md"
                : "bg-white text-gray-700 border-gray-300 hover:bg-blue-100"
              }
            `}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Content */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-600 animate-pulse">Loading Pokémon…</p>
        </div>
      ) : filtered.length === 0 ? (
        <p className="text-center text-gray-500 text-lg mt-10">
          No Pokémon found for selected type 🫠
        </p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {filtered.map((p) => (
            <PokemonCard key={p.id} pokemon={p} listIds={ids} from="/gallery" />
          ))}
        </div>
      )}
    </div>
  );
}