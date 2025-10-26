import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PokemonService } from '../../core/services/pokemon.service';
import { Pokemon } from '../../core/models/pokemon.model';
import { PokemonDetailStore } from './store/pokemon-detail.store';
import { PokemonIdPipe } from '../../shared/pipes/pokemon-id.pipe';
import { StatPercentagePipe } from '../../shared/pipes/stat-percentage.pipe';
import { PokemonTypeDirective } from '../../shared/directives/pokemon-type.directive';
import { ImgFallbackDirective } from '../../shared/directives/img-fallback.directive';

@Component({
  selector: 'app-pokemon-detail',
  imports: [FormsModule, PokemonIdPipe, StatPercentagePipe, PokemonTypeDirective, ImgFallbackDirective],
  templateUrl: './pokemon-detail.html',
  styleUrl: './pokemon-detail.scss'
})
export class PokemonDetail {
  private pokemonService = inject(PokemonService);
  private store = inject(PokemonDetailStore);

  searchInput = signal('');
  searchMethod = signal<'input' | 'select'>('input');
  selectedPokemon = signal('');
  
  popularPokemons = [
    { id: 1, name: 'bulbasaur' },
    { id: 25, name: 'pikachu' },
    { id: 4, name: 'charmander' },
    { id: 7, name: 'squirtle' },
    { id: 6, name: 'charizard' },
    { id: 150, name: 'mewtwo' },
    { id: 151, name: 'mew' },
    { id: 94, name: 'gengar' },
    { id: 143, name: 'snorlax' },
    { id: 131, name: 'lapras' }
  ];

  pokemon = this.store.pokemon;
  loading = this.store.loading;
  error = this.store.error;

  onSelectPokemon() {
    const selected = this.selectedPokemon();
    if (selected) {
      this.searchInput.set(selected);
      this.searchPokemon();
    }
  }

  searchPokemon() {
    const input = this.searchInput().trim();
    if (!input) {
      this.store.reset();
      return;
    }

    const inputAsNumber = parseInt(input, 10);
    // Verifica si la entrada es un número que coincide exactamente con el input
    const isId = !isNaN(inputAsNumber) && inputAsNumber > 0 && String(inputAsNumber) === input;

    // Escribe el valor en la señal correcta del servicio para disparar el rxResource
    if (isId) {
      this.pokemonService.pokemonNameInput.set('');
      this.pokemonService.pokemonIdInput.set(inputAsNumber);
    } else {
      this.pokemonService.pokemonIdInput.set(0);
      this.pokemonService.pokemonNameInput.set(input.toLowerCase());
    }
  }
}
