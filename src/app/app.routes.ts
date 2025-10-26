import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/pokemon-list/pokemon-list').then(m => m.PokemonListComponent)
  },
  {
    path: 'pokemon',
    loadComponent: () => import('./features/pokemon-detail/pokemon-detail').then(m => m.PokemonDetail)
  }
];
