import { Injectable, computed, inject } from '@angular/core';
import { PokemonService } from '@app/core/services/pokemon.service';

@Injectable({ providedIn: 'root' })
export class PokemonDetailStore {

  private pokemonService = inject(PokemonService);

  private resource = this.pokemonService.pokemonByNameResource;

  // 1. Data (The actual Pokemon object)
  pokemon = computed(() => this.resource.value());

  // 2. Loading State
  loading = computed(() => this.resource.isLoading());

  // 3. Error State (Formatted for display)
  error = computed(() => {
    const err = this.resource.error();
    // Format the error, or return null if none
    return err ? err.message || 'Error loading Pokemon details.' : null;
  });

  // 4. The 'reset' method now only resets the input signal, which re-runs the resource
  reset() {
     this.pokemonService.pokemonNameInput.set('');
  }
}
