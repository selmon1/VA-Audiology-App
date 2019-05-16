import { Component, transition } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilities } from '../common/utlilities';
import { TsScreenerDataService } from '../services/ts-screener-data.service';
import { TfiDataService } from '../services/tfi-data.service';
import { ThsDataService } from '../services/ths-data.service';

@Component({
  selector: 'check-in',
  styleUrls: ['./check-in.component.css'],
  templateUrl: './check-in.component.html',
})

export class CheckInComponent {
  public patientId: string = '';
  public firstName: string = '';
  public lastName: string = '';
  public email: string = '';
  public authenticationFlag: boolean = true;

  public badPatientId: boolean = false;
  public badEmail: boolean = false;
  
  constructor(private router: Router, private tsDataService: TsScreenerDataService, private tfiDataService: TfiDataService, private thsDataService: ThsDataService) {};
  
  public onClick() {
    if(this.isCredentialsValid()) {
      sessionStorage.clear();
      this.tsDataService.clearHistory();
      this.tfiDataService.clearHistory();
      this.thsDataService.clearHistory();
      Utilities.setSessionStorage('patient-id', this.patientId);
      Utilities.setSessionStorage('first-name', this.firstName);
      Utilities.setSessionStorage('last-name', this.lastName);
      Utilities.setSessionStorage('email', this.email);
      this.router.navigateByUrl('/appointments');
    } else {
      this.authenticationFlag = false;
      this.patientId = '';
    }
  }

  isCredentialsValid() : boolean {
    this.badPatientId = false;
    this.badEmail = false;

    let result = true;

    // Check these individually so we can set the corresponding flags
    // and still return the result.
    if(!this.isPatientIdValid()) {
      this.badPatientId = true;
      result = false;
    }

    if(!this.isEmailValid()) {
      this.badEmail = true;
      result = false;
    }

    return result;
  }

  isEmailValid() : boolean {
    let numAtSymbols : number = 0;

    // Email is an optional field the user does not need
    // to fill out. However, should they choose to do so, it
    // should follow a proper format.
    if(this.email.length === 0)
      return true;

    // Credit for this here: https://tylermcginnis.com/validate-email-address-javascript/
    var re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(this.email);
  }

  isPatientIdValid() : boolean {
    return /^\d+$/.test(this.patientId);
  }
  
  /**
   * This function is called when the "enter" key on the keyboard is pressed.
   * If the key has the value of 13, then this function will call the "onClick" function from above.
   * @param event the event caught by the action.
  */
  public keyDownFunction(event) {
    if (event.keyCode === 13) {
      this.onClick();
    } else {
      this.authenticationFlag = true;

      this.badPatientId = false;
      this.badEmail = false;
    }
  }
}
