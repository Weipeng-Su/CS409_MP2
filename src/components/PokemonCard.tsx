import React from "react";
import { Pokemon } from "../types/pokemon";
import { Link } from "react-router-dom";

interface Props {
  pokemon: Pokemon;
  listIds: number[];
}

export default function PokemonCard({ pokemon, listIds }: Props) {
  const img =
    pokemon.sprites.other?.["official-artwork"]?.front_default ||
    pokemon.sprites.front_default ||
    "";

  return (
    <Link
      to={`/item/${pokemon.id}`}
      state={{ list: listIds }}
      className="border rounded p-3 hover:bg-gray-100"
    >
      <img src={img} alt={pokemon.name} className="h-24 mx-auto" />
      <h3 className="text-center capitalize mt-2">{pokemon.name}</h3>
    </Link>
  );
}