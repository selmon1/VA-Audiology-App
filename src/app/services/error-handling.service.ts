import { Injectable } from '@angular/core';
import { NotificationService } from './notification.service';
import { Observable } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class ErrorHandlingService {

  constructor(private notificationService: NotificationService)  { }
  
  public handleServerError<T>() {
    return (error: any): Observable<T>  => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.notificationService.showError(`Request failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      throw error;
    };
  }
}
