import React, { useEffect, useState } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import { fetchPokemon } from "../api/pokemon";
import { Pokemon } from "../types/pokemon";

export default function DetailPage() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const list: number[] | undefined = location.state?.list;

  const [pokemon, setPokemon] = useState<Pokemon | null>(null);

  useEffect(() => {
    if (id) fetchPokemon(id).then(setPokemon);
  }, [id]);

  if (!pokemon)
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg text-gray-600 animate-pulse">Loading Pokémon…</p>
      </div>
    );

  const index = list?.indexOf(Number(id));
  const prevId = list && index != null && index > 0 ? list[index - 1] : null;
  const nextId = list && index != null && index < list.length - 1 ? list[index + 1] : null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-yellow-50 to-yellow-100 p-6">
      <div className="bg-white shadow-lg rounded-3xl p-6 w-full max-w-md flex flex-col items-center">
        {/* Pokémon Name */}
        <h1 className="text-4xl font-bold capitalize text-yellow-700 mb-4 drop-shadow-sm">
          {pokemon.name}
        </h1>

        {/* Pokémon Image */}
        <img
          src={pokemon.sprites.other?.["official-artwork"]?.front_default || pokemon.sprites.front_default || ""}
          alt={pokemon.name}
          className="h-48 w-48 object-contain mb-4"
        />

        {/* Stats */}
        <div className="w-full flex justify-between text-gray-700 mb-3">
          <span>ID: <strong>{pokemon.id}</strong></span>
          <span>Height: <strong>{pokemon.height}</strong></span>
          <span>Weight: <strong>{pokemon.weight}</strong></span>
        </div>

        {/* Types */}
        <div className="flex gap-2 flex-wrap justify-center mb-4">
          {pokemon.types.map((t) => (
            <span
              key={t.type.name}
              className={`
                px-3 py-1 rounded-full text-sm font-medium text-white
                ${
                  t.type.name === "fire"
                  ? "bg-red-500"
                  : t.type.name === "water"
                  ? "bg-blue-500"
                  : t.type.name === "grass"
                  ? "bg-green-500"
                  : t.type.name === "electric"
                  ? "bg-yellow-400"
                  : t.type.name === "poison"
                  ? "bg-purple-400"
                  : t.type.name === "flying"
                  ? "bg-sky-400"
                  : t.type.name === "bug"
                  ? "bg-green-800"
                  : t.type.name === "ground"
                  ? "bg-orange-800"
                  : t.type.name === "fairy"
                  ? "bg-fuchsia-500"
                  : "bg-gray-400"
                }
              `}
            >
              {t.type.name}
            </span>
          ))}
        </div>

        {/* Navigation Buttons */}
        <div className="flex gap-4 mt-4">
          <button
            disabled={!prevId}
            onClick={() => prevId && navigate(`/item/${prevId}`, { state: { list } })}
            className={`
              px-4 py-2 rounded-lg font-medium shadow transition 
              ${prevId ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-600 cursor-not-allowed"}
            `}
          >
            Prev
          </button>

          <button
            disabled={!nextId}
            onClick={() => nextId && navigate(`/item/${nextId}`, { state: { list } })}
            className={`
              px-4 py-2 rounded-lg font-medium shadow transition
              ${nextId ? "bg-blue-500 text-white hover:bg-blue-600" : "bg-gray-300 text-gray-600 cursor-not-allowed"}
            `}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}