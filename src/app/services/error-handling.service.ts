import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorHandlingService {

  constructor(private notificationService: NotificationService) { }

  public handleServerError<T>() {
    return (error: HttpErrorResponse): Observable<T> => {
      if ([400, 401, 403, 409].includes(error.status)) {
        this.notificationService.showError(error.error.type + ': ' + error.error.message);
      } else if (error.status == 404) {
        this.notificationService.showError("Server Not Found: Server was unable to find the requested endpoint: " + error.url);
      } else {
        this.notificationService.showError('Unexpected Error: ' + error.message);
      }
      throw error;
    };
  }
}
