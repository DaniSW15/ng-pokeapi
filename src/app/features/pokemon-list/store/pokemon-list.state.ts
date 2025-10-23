import { Pokemon } from "@app/core/models/pokemon.model";

export interface PokemonListState {
  pokemons: Pokemon[];
  loading: boolean;
  error: string | null;
}

export const initialState: PokemonListState = {
  pokemons: [],
  loading: false,
  error: null
};
