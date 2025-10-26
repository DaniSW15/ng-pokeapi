import { Directive, ElementRef, HostListener, Input, inject } from '@angular/core';
import Swal from 'sweetalert2';
import { NotificationService } from '../../core/services/notification.service';

@Directive({
  selector: 'img[appImgFallback]',
  standalone: true
})
export class ImgFallbackDirective {
  private el = inject(ElementRef);
  private notificationService = inject(NotificationService);
  
  @Input() appImgFallback = '/assets/pokemon-placeholder.png';

  @HostListener('error')
  onError() {
    this.el.nativeElement.src = this.appImgFallback;
    
    if (this.notificationService.canShowError('image-load-error')) {
      Swal.fire({
        icon: 'warning',
        title: 'Sin conexión',
        text: 'No se pudo cargar la imagen. Verifica tu conexión a internet.',
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 3000
      });
    }
  }
}
