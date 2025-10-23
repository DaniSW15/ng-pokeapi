import { Injectable, computed, inject } from '@angular/core';
import { PokemonService } from '@app/core/services/pokemon.service';

@Injectable({ providedIn: 'root' })
export class PokemonListStore {
  private service = inject(PokemonService);

  // Referencia al Resource
  private resource = this.service.pokemonsListResource;

  // ✅ Estado reactivo basado en el ResourceRef:

  // 1. Datos (Pokémons)
  // Usamos 'value() || []' para garantizar que siempre sea un array.
  pokemons = computed(() => this.resource.value() || []);

  // 2. Estado de carga
  loading = computed(() => this.resource.isLoading());

  // 3. Estado de error
  error = computed(() => {
    const err = this.resource.error();
    return err ? err.message || 'Error al cargar la lista de pokémons.' : null;
  });
}
