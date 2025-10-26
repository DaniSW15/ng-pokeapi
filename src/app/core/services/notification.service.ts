import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class NotificationService {
  private lastError = '';
  private lastErrorTime = 0;
  private readonly THROTTLE_TIME = 3000;

  canShowError(error: string): boolean {
    const now = Date.now();
    if (error === this.lastError && now - this.lastErrorTime < this.THROTTLE_TIME) {
      return false;
    }
    this.lastError = error;
    this.lastErrorTime = now;
    return true;
  }
}
