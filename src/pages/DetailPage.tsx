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

  if (!pokemon) return <p>Loading…</p>;

  const index = list?.indexOf(Number(id));
  const prevId = list && index != null && index > 0 ? list[index - 1] : null;
  const nextId = list && index != null && index < list.length - 1 ? list[index + 1] : null;

  return (
    <div className="p-4">
      <h1 className="text-3xl capitalize">{pokemon.name}</h1>
      <img
        src={pokemon.sprites.other?.["official-artwork"]?.front_default || ""}
        alt={pokemon.name}
        className="h-48"
      />
      <p>ID: {pokemon.id}</p>
      <p>Height: {pokemon.height}</p>
      <p>Weight: {pokemon.weight}</p>
      <p>Types: {pokemon.types.map(t => t.type.name).join(", ")}</p>
      <div className="flex gap-2 mt-4">
        <button disabled={!prevId} onClick={() => navigate(`/item/${prevId}`, { state: { list } })}>
          Prev
        </button>
        <button disabled={!nextId} onClick={() => navigate(`/item/${nextId}`, { state: { list } })}>
          Next
        </button>
      </div>
    </div>
  );
}