import { Pokemon } from "@app/core/models/pokemon.model";

export interface PokemonDetailState {
  pokemon: Pokemon | null;
  loading: boolean;
  error: string | null;
}

export const initialState: PokemonDetailState = {
  pokemon: null,
  loading: false,
  error: null
};
