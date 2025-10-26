import { Injectable, effect, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, forkJoin, map, switchMap, throwError } from 'rxjs';
import { Pokemon, PokemonListItem, PokemonListResponse } from '../models/pokemon.model';
import { rxResource } from '@angular/core/rxjs-interop';
import { PokemonMapper } from '../mappers/pokemon.mapper';

@Injectable({ providedIn: 'root' })
export class PokemonService {
  private http = inject(HttpClient);
  private apiUrl = 'https://pokeapi.co/api/v2';

  params = signal<{ limit: number; offset: number }>({ limit: 20, offset: 0 });
  pokemonNameInput = signal('');
  pokemonIdInput = signal(0);

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

  pokemonByNameResource = rxResource<Pokemon, string>({
    params: this.pokemonNameInput,
    stream: ({ params: name }) => {
      if (!name) {
        return new Observable<Pokemon>((observer) => observer.complete());
      }

      return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${name}`).pipe(
        catchError((httpError: HttpErrorResponse) => {
          let errorMessage: string;

          if (httpError.status === 404) {
            // ✅ Aquí la lógica es correcta: sabes que es un 404 y puedes dar el detalle
            errorMessage = `Error 404: Pokémon '${name}' no encontrado.`;
          } else {
            // Fallback para otros errores (servidor/conexión)
            errorMessage = `Error ${httpError.status || 'Desconocido'}: Fallo en la conexión.`;
          }

          // Relanza el Error personalizado para que el Store lo muestre
          return throwError(() => new Error(errorMessage));
        }),
        map((pokemon) => PokemonMapper.formatPokemonName(pokemon))
      );
    },
  });

  pokemonByIdResource = rxResource<Pokemon, number>({
    params: this.pokemonIdInput,
    stream: ({ params: id }) => {
      if (!id || id <= 0) {
        return new Observable<Pokemon>((observer) => observer.complete());
      }

      return this.http.get<Pokemon>(`${this.apiUrl}/pokemon/${id}`);
    },
  });
}
