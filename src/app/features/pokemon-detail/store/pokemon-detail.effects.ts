import { Injectable, inject } from '@angular/core';
import { PokemonService } from '@app/core/services/pokemon.service';

@Injectable({ providedIn: 'root' })
export class PokemonDetailEffects {
  private service = inject(PokemonService);

  loadPokemonByName(name: string) {
    this.service.pokemonIdInput.set(0); // Reset ID input
    this.service.pokemonNameInput.set(name);
  }

  loadPokemonById(id: number) {
    this.service.pokemonNameInput.set(''); // Reset name input
    this.service.pokemonIdInput.set(id);
  }
}
