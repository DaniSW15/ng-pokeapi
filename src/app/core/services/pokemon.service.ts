import { Injectable, effect, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, forkJoin, map, switchMap } from 'rxjs';
import { Pokemon, PokemonListItem, PokemonListResponse } from '../models/pokemon.model';
import { rxResource } from '@angular/core/rxjs-interop';
import { PokemonMapper } from '../mappers/pokemon.mapper';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);
  private apiUrl = 'https://pokeapi.co/api/v2';

  params = signal<{ limit: number; offset: number }>({ limit: 20, offset: 0 });
  pokemonNameInput = signal(''); // Para buscar por nombre
  pokemonIdInput = signal(0);

  getPokemons(limit: number, offset: number): Observable<Pokemon[]> {
    return this.http
      .get<PokemonListResponse>(`${this.apiUrl}/pokemon?limit=${limit}&offset=${offset}`)
      .pipe(
        switchMap((response) =>
          PokemonMapper.mapListResponseToPokemons(response, this.http, this.apiUrl)
        )
      );
  }

  pokemonsListResource = rxResource({
    params: this.params,
    stream: ({ params: p }) => {
      return this.http
        .get<PokemonListResponse>(`${this.apiUrl}/pokemon?limit=${p.limit}&offset=${p.offset}`)
        .pipe(
          switchMap((listResponse: PokemonListResponse) => {
            return PokemonMapper.mapListResponseToPokemons(listResponse, this.http, this.apiUrl);
          })
        );
    },
  });

  getPokemonByName(name: string) {
    return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${name}`)
      .pipe(map(pokemon => PokemonMapper.formatPokemonName(pokemon)));
  }

  pokemonByNameResource = rxResource({
    params: this.pokemonNameInput,
    stream: ({ params: name }) => {
      if (!name) return this.http.get<any>('');
      return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${name}`)
        .pipe(map(pokemon => PokemonMapper.formatPokemonName(pokemon)));
    },
  });

  getPokemonById(id: number) {
    return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${id}`)
      .pipe(map(pokemon => PokemonMapper.formatPokemonName(pokemon)));
  }

  pokemonByIdResource = rxResource({
    params: this.pokemonIdInput,
    stream: ({ params: id }) => {
      return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${id}`)
        .pipe(map(pokemon => PokemonMapper.formatPokemonName(pokemon)));
    },
  });
}
