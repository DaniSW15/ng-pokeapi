import { Directive, ElementRef, Input, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appPokemonType]',
  standalone: true
})
export class PokemonTypeDirective implements OnInit {
  private el = inject(ElementRef);
  
  @Input() appPokemonType = '';

  ngOnInit() {
    this.el.nativeElement.classList.add('type', this.appPokemonType);
  }
}
