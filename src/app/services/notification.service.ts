import { Injectable } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar'

//Use case and initial syntax of snackbar was referenced from: https://blog.angularindepth.com/expecting-the-unexpected-best-practices-for-error-handling-in-angular-21c3662ef9e4

@Injectable()
export class NotificationService {

  constructor(public snackBar: MatSnackBar) { }

  public showSuccess(message: string): void {
    this.snackBar.open(message, 'Close', {duration: 7000});
  }

  public showError(message: string): void {
    // The second parameter is the text in the button. 
    // In the third, we send in the css class for the snack bar.
    this.snackBar.open(message, 'Close', {extraClasses: ['error'], duration: 7000});
  }
}
