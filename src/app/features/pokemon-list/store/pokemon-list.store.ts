import { Injectable, computed, inject } from '@angular/core';
import { PokemonService } from '@app/core/services/pokemon.service';

@Injectable({ providedIn: 'root' })
export class PokemonListStore {
  private service = inject(PokemonService);
  private resource = this.service.pokemonsListResource;

  pokemons = computed(() => this.resource.value() || []);
  loading = computed(() => this.resource.isLoading());
  error = computed(() => {
    const err = this.resource.error();
    return err ? err.message || 'Error al cargar la lista de pokémons.' : null;
  });
}
