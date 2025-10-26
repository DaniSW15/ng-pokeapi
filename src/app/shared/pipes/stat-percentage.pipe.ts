import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statPercentage',
  standalone: true
})
export class StatPercentagePipe implements PipeTransform {
  transform(value: number, max: number = 255): number {
    return (value / max) * 100;
  }
}
