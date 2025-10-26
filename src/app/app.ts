import { Component, inject, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NetworkService } from './core/services/network.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('ng-pokeapi');
  networkService = inject(NetworkService);
}
