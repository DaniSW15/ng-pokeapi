import { Component, inject, OnInit } from '@angular/core';
import { PokemonListStore } from './store/pokemon-list.store';
import { PokemonListEffects } from './store/pokemon-list.effects';
import { PokemonIdPipe } from '../../shared/pipes/pokemon-id.pipe';

@Component({
  selector: 'app-pokemon-list',
  imports: [PokemonIdPipe],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonListComponent implements OnInit {
  store = inject(PokemonListStore);
  effects = inject(PokemonListEffects);

  ngOnInit() {
    this.effects.loadPokemons();
  }

  loadMore() {
    const offset = this.store.pokemons().length;
    this.effects.loadPokemons(40, offset);
  }
}
