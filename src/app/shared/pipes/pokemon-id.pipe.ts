import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pokemonId',
  standalone: true
})
export class PokemonIdPipe implements PipeTransform {
  transform(id: number): string {
    return '#' + id.toString().padStart(3, '0');
  }
}
