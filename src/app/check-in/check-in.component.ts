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

   /**
    * This function will be call when the "check in" button is pressed.
    * It evaluates the value is typed in the input area; if the value has the length of 6,
    * then the page will be route to the "audiologist" page;
    * if the value of length 4, then the page will be route to the "appointment" page.
    * If the value has different length, then it will be informed as incorrect check in.
    */
   public onClick() {
      if (this.patientId === '123456') {
          Utilities.setSessionStorage('audiologist-pin', this.patientId);
          console.log('Audiologist log in ' + this.patientId);
          this.router.navigateByUrl('/audiologist');
      } else if (this.patientId.length === 4) {
        sessionStorage.clear();
        this.tsDataService.clearHistory();
        this.tfiDataService.clearHistory();
        this.thsDataService.clearHistory();
        Utilities.setSessionStorage('patient-id', this.patientId);
        this.router.navigateByUrl('/appointments');
        console.log('log in with ' + this.patientId);
      } else {
          this.authenticationFlag = false;
          this.patientId = '';
          console.log('failed log in ' + this.patientId);
      }
   }

   /**
    * This function is called when the "enter" key on the keyboard is pressed.
    * If the key has the value of 13, then this function will call the "onClick" function from above.
    * @param event the event caught by the action.
    */
   public keyDownFunction(event) {
    if ( event.keyCode === 13) {
      this.onClick();
    } else {
      this.authenticationFlag = true;
    }
  }

  }
