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
   public lastFourSS: string = '';
   public authenticationFlag: boolean = true;

   constructor(private router: Router, private tsDataService: TsScreenerDataService, private tfiDataService: TfiDataService, private thsDataService: ThsDataService) {};

   public numRearrange(num) {
      let fst = Number(num[0]);
      let snd = Number(num[1]);
      let thd = Number(num[2]);
      let frt = Number(num[3]);
      if (frt < 9) {
        frt += 1;
      } else { frt -= 5; }

      if (thd < 5) {
        thd += 4;
      } else { thd -= 2; }

      if (snd < 7) {
        snd += 2;
      } else { snd -= 3; }

      if (fst < 7) {
        fst += 2;
      } else { fst -= 2; }

      let result1 = thd.toString();
      let result2 = fst.toString();
      let result3 = frt.toString();
      let result4 = snd.toString();

      return result1 + result2 + result3 + result4;
   }
   public idGenerator() {
     let hash = 0;
     let first = this.firstName;
     let last = this.lastName;
     // name = this.firstName.charCodeAt(0) + this.lastName.charCodeAt(0);
     if (this.firstName == null || this.lastName == null || this.lastFourSS == null) {
       return hash;
     }
     // for (let i = 0; i < nameLength; i++) {
     //   hash += Math.pow(name.charCodeAt(i) * 31, nameLength - i);
     // }
     let result = first.substr(0, 3) + last.substr(0, 3) + this.numRearrange(this.lastFourSS);
     return result;
   }

   /**
    * This function will be call when the "check in" button is pressed.
    * It evaluates the value is typed in the input area; if the value has the length of 6,
    * then the page will be route to the "audiologist" page;
    * if the value of length 4, then the page will be route to the "appointment" page.
    * If the value has different length, then it will be informed as incorrect check in.
    */

   public onClick() {

     if (this.firstName.length >= 2 && this.lastName.length >= 2 && this.lastFourSS.length === 4
          && isNaN(this.firstName) && isNaN(this.lastName)) {
       sessionStorage.clear();
       this.tsDataService.clearHistory();
       this.tfiDataService.clearHistory();
       this.thsDataService.clearHistory();
       Utilities.setSessionStorage('patient-id', this.idGenerator().toString());
       console.log(this.idGenerator().toString());
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
