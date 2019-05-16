import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorHandlingService {

  constructor(private notificationService: NotificationService) { }

  public handleServerError<T>() {
    return (error: HttpErrorResponse): Observable<T> => {
      if (error.status == 400) {
        this.notificationService.showError(error.error.type + ': ' + error.error.message);
      } else if (error.status == 401) {
        this.notificationService.showError(error.error.type + ': ' + error.error.message);
      } else if (error.status == 403) {
        this.notificationService.showError(error.error.type + ': ' + error.error.message);
      } else if (error.status == 404) {
        this.notificationService.showError("Connection Not Found: Please check your internet connection.");
      } else if (error.status == 409) {
        this.notificationService.showError(error.error.type + ': ' + error.error.message);
      } else {
        this.notificationService.showError('Unexpected Error: ' + error.message);
      }
      //TODO: Create Default Observable object here.
      throw error;
    };
  }
}
