export interface PokemonListResult {
  name: string;
  url: string; // contains ID
}

export interface PokemonListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: PokemonListResult[];
}

export interface Pokemon {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      ["official-artwork"]?: { front_default: string | null };
    };
  };
  types: { slot: number; type: { name: string } }[];
  weight: number;
  height: number;
  abilities: { ability: { name: string } }[];
}
