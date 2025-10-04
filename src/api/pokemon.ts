import api from "./apiClient";
import { PokemonListResponse, Pokemon } from "../types/pokemon";

export const fetchPokemonList = async (limit = 151, offset = 0) => {
  const res = await api.get<PokemonListResponse>(
    `/pokemon?limit=${limit}&offset=${offset}`
  );
  return res.data;
};

export const fetchPokemon = async (nameOrId: string | number) => {
  const res = await api.get<Pokemon>(`/pokemon/${nameOrId}`);
  return res.data;
};
