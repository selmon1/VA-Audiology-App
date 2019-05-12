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
      console.log(this.patientId);
      console.log(this.firstName);
      console.log(this.lastName);
      console.log(this.email);
      this.router.navigateByUrl('/appointments');
      console.log('log in with ' + this.patientId);
    } else {
      this.authenticationFlag = false;
      this.patientId = '';
      console.log('failed log in ' + this.patientId);
    }
  }

  isCredentialsValid() : boolean {
    return this.isEmailValid() && this.isPatientIdValid();
  }

  isEmailValid() : boolean {
    let numAtSymbols : number = 0;

    // Email is an optional field the user does not need
    // to fill out. However, should they choose to do so, it
    // should follow a proper format.
    if(this.email.length === 0)
      return true;

    let i: number;
    for(i = 0; i < this.email.length; i++) {
      if(this.email.charAt(i) === '@')
        numAtSymbols++;
    }

    if(numAtSymbols !== 1)
      return false;

    // Credit for this here: https://tylermcginnis.com/validate-email-address-javascript/
    // Doesn't seem to handle multiple @ symbols however.
    let regexp = new RegExp('^[^\s@]+@[^\s@]+\.[^\s@]+$');

    return regexp.test(this.email);
  }

  isPatientIdValid() : boolean {
    const PATIENT_ID_LENGTH = 4;

    return this.patientId.length == PATIENT_ID_LENGTH && this.isPatientIdNumber();
  }
  
  isPatientIdNumber() : boolean {
    let result : boolean = true;

    let i : number = 0;
    for(i = 0; i < this.patientId.length; i++) {
      if(isNaN(parseInt(this.patientId[i], 10))) {
        result = false;
        break;
      }
    }

    return result;
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
    }
  }
}
