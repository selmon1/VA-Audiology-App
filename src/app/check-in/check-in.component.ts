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
  public authenticationFlag: boolean = true;
  
  constructor(private router: Router, private tsDataService: TsScreenerDataService, private tfiDataService: TfiDataService, private thsDataService: ThsDataService) {};
  
  public onClick() {
    if(this.patientId.length === 4 && this.isPatientIdNumber()) {  
      sessionStorage.clear();
      this.tsDataService.clearHistory();
      this.tfiDataService.clearHistory();
      this.thsDataService.clearHistory();
      Utilities.setSessionStorage('patient-id', this.patientId);
      console.log(this.patientId);
      this.router.navigateByUrl('/appointments');
      console.log('log in with ' + this.patientId);
    } else {
      this.authenticationFlag = false;
      this.patientId = '';
      console.log('failed log in ' + this.patientId);
    }
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
