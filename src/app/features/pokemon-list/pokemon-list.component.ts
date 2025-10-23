import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PokemonListStore } from './store/pokemon-list.store';
import { PokemonListEffects } from './store/pokemon-list.effects';

@Component({
  selector: 'app-pokemon-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pokemon-list.component.html',
  styleUrl: './pokemon-list.component.scss',
})
export class PokemonListComponent {
  store = inject(PokemonListStore);
  effects = inject(PokemonListEffects);

  ngOnInit() {
    this.effects.loadPokemons();
  }

  loadMore() {
    const offset = this.store.pokemons().length;
    this.effects.loadPokemons(20, offset);
  }
}
