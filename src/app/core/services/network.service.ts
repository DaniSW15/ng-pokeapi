import { Injectable, signal } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({ providedIn: 'root' })
export class NetworkService {
  isOnline = signal(navigator.onLine);

  constructor() {
    window.addEventListener('online', () => {
      this.isOnline.set(true);
      Swal.fire({
        icon: 'success',
        title: 'Conectado',
        text: 'Conexión a internet restaurada',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    });

    window.addEventListener('offline', () => {
      this.isOnline.set(false);
      Swal.fire({
        icon: 'error',
        title: 'Sin conexión',
        text: 'No hay conexión a internet',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 5000
      });
    });
  }
}
