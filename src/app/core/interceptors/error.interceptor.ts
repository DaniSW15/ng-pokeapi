import { HttpInterceptorFn, HttpErrorResponse } from '@angular/common/http';
import { catchError, throwError } from 'rxjs';
import { inject } from '@angular/core';
import Swal from 'sweetalert2';
import { NotificationService } from '../services/notification.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const notificationService = inject(NotificationService);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      let errorMessage = 'Error desconocido';

      if (error.status === 404) {
        errorMessage = 'Pokémon no encontrado';
      } else if (error.status === 0) {
        errorMessage = 'Error de conexión';
      } else if (error.status >= 500) {
        errorMessage = 'Error del servidor';
      }

      if (notificationService.canShowError(errorMessage)) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: errorMessage,
          toast: true,
          position: 'top-end',
          showConfirmButton: false,
          timer: 3000
        });
      }

      return throwError(() => error);
    })
  );
};
