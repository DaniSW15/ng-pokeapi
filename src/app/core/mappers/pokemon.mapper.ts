import { Observable, forkJoin, map } from 'rxjs';
import { Pokemon, PokemonListResponse } from '../models/pokemon.model';
import { HttpClient } from '@angular/common/http';

export class PokemonMapper {
  static mapListResponseToPokemons(
    response: PokemonListResponse,
    http: HttpClient,
    apiUrl: string
  ): Observable<Pokemon[]> {
    return forkJoin(
      response.results.map((item) =>
        http.get<Pokemon>(`${apiUrl}/pokemon/${item.name}`)
      )
    );
  }

  static formatPokemonName(pokemon: Pokemon): Pokemon {
    return {
      ...pokemon,
      name: pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)
    };
  }
}
