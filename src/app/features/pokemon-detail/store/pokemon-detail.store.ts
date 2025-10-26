import { Injectable, computed, inject } from '@angular/core';
import { Pokemon } from '@app/core/models/pokemon.model';
import { PokemonService } from '@app/core/services/pokemon.service';

@Injectable({ providedIn: 'root' })
export class PokemonDetailStore {
  private pokemonService = inject(PokemonService);

  private resource = computed(() => {
    if (this.pokemonService.pokemonNameInput() !== '') {
      return this.pokemonService.pokemonByNameResource;
    }
    if (this.pokemonService.pokemonIdInput() !== 0) {
      return this.pokemonService.pokemonByIdResource;
    }
    return null;
  });

  // 1. Data (The actual Pokemon object)
  pokemon = computed<Pokemon | null>(() => {
    const res = this.resource();
    if (!res || res.error()) return null;
    return res.value() || null;
  });

  // 2. Loading State
  loading = computed(() => this.resource()?.isLoading() || false);

  // 3. Error State (Formatted for display)
  error = computed(() => {
    const resourceError = this.resource()?.error();
    if (resourceError instanceof Error) {
      return resourceError.message;
    }
    return resourceError ? 'Error al cargar los datos del Pokémon.' : null;
  });

  // 4. The 'reset' method now only resets the input signal, which re-runs the resource
  reset() {
    this.pokemonService.pokemonNameInput.set('');
    this.pokemonService.pokemonIdInput.set(0);
  }
}
