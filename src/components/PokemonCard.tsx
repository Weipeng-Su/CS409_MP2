import React from "react";
import { Pokemon } from "../types/pokemon";
import { Link } from "react-router-dom";

interface Props {
  pokemon: Pokemon;
  listIds: number[];
  from?: string;
}

export default function PokemonCard({ pokemon, listIds, from }: Props) {
  const img =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default ||
    "";

  return (
    <Link
      to={`/item/${pokemon.id}`}
      state={{ list: listIds, from }}
      className="
        flex flex-col items-center 
        bg-white 
        border border-gray-200 
        rounded-2xl 
        p-4 
        shadow-md 
        hover:shadow-xl 
        hover:bg-yellow-50 
        transition 
        transform 
        hover:-translate-y-1
      "
    >
      <img
        src={img}
        alt={pokemon.name}
        className="h-28 w-28 object-contain mb-3"
      />
      <h3 className="text-center capitalize font-semibold text-lg text-gray-800">
        {pokemon.name}
      </h3>

      <div className="flex gap-1 mt-2 flex-wrap justify-center">
        {pokemon.types.map((t) => (
          <span
            key={t.type.name}
            className={`px-2 py-1 rounded-full text-xs font-medium text-white ${
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
            }`}
          >
            {t.type.name}
          </span>
        ))}
      </div>
    </Link>
  );
}