import { Injectable, inject } from '@angular/core';
import { PokemonListStore } from './pokemon-list.store';
import { PokemonService } from '@app/core/services/pokemon.service';

@Injectable({ providedIn: 'root' })
export class PokemonListEffects {
  private service = inject(PokemonService);
  private store = inject(PokemonListStore);

  loadPokemons(limit = 20, offset = 0) {
    this.service.params.set({ limit, offset });
  }
}
