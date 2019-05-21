import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ReloginPopupComponent } from '../relogin-popup/relogin-popup.component';
import { MatDialog } from '@angular/material';

@Injectable()
export class ErrorHandlingService {

  constructor(private notificationService: NotificationService, private router: Router, private popup: MatDialog) { }

  public handleServerError<T>() {
    return (error: HttpErrorResponse): Observable<T> => {
      if ([400, 403, 409].includes(error.status)) {
        this.notificationService.showError(error.error.type + ': ' + error.error.message);
      } else if (error.status == 401) {
        if(this.router.url === '/aud-login') {
          this.notificationService.showError('Username or password is incorrect, please try again.');
        } else {
          this.popup.open(ReloginPopupComponent);
        }
      }else if (error.status == 404) {
        this.notificationService.showError("Server Not Found: Server was unable to find the requested endpoint: " + error.url);
      } else {
        this.notificationService.showError('Unexpected Error: ' + error.message);
      }
      throw error;
    };
  }
}
