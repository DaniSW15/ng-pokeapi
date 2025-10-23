import { Pokemon } from "@app/core/models/pokemon.model";

export const PokemonListActions = {
  load: () => ({ type: '[Pokemon List] Load' as const }),
  loadSuccess: (pokemons: Pokemon[]) => ({
    type: '[Pokemon List] Load Success' as const,
    pokemons
  }),
  loadError: (error: string) => ({
    type: '[Pokemon List] Load Error' as const,
    error
  })
};

export type PokemonListAction = ReturnType<typeof PokemonListActions[keyof typeof PokemonListActions]>;
