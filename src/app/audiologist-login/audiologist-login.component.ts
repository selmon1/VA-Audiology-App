import { Component, transition } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Utilities } from '../common/utlilities';
import { TsScreenerDataService } from '../services/ts-screener-data.service';
import { TfiDataService } from '../services/tfi-data.service';
import { ThsDataService } from '../services/ths-data.service';
import { ServerAuthenticationService } from '../services/server-authentication.service';

@Component({
  selector: 'audiologist-login',
  styleUrls: ['./audiologist-login.component.css'],
  templateUrl: './audiologist-login.component.html',
})

export class AudiologistLoginComponent {
  // Added audiologistUserName & changed (patientId --> audiologistID)
  public audiologistUserName: string = '';
  public audiologistPassword: string = '';
  public authenticationFlag: boolean = true;

  constructor(private router: Router, private tsDataService: TsScreenerDataService, private tfiDataService: TfiDataService, private thsDataService: ThsDataService, private serverAuthenticationService: ServerAuthenticationService) {
        //If we are already Authenticated: redirect to the Audiologist page

    this.serverAuthenticationService.heartbeat().subscribe((response) => {
      this.router.navigateByUrl('/audiologist');
    });
  }

  /**
   * This function will be call when the "check in" button is pressed.
   * It evaluates the value is typed in the input area; if the value has the length of 6,
   * then the page will be route to the "audiologist" page;
   * if the value of length 4, then the page will be route to the "appointment" page.
   * If the value has different length, then it will be informed as incorrect check in.
   */
  public onClick() {

    // Added new check for audiologistUserName on top off audiologistID
    this.serverAuthenticationService.login(this.audiologistUserName, this.audiologistPassword).subscribe((response) => {
      Utilities.setSessionStorage('userId', response.data.user.toString());
      Utilities.setSessionStorage('sessionId', response.data.session.toString());
      Utilities.setSessionStorage('permissions' , 'audiologist');
      //Utilities.setSessionStorage('permissions' , 'admin');
      console.log('Audiologist log in ' + this.audiologistUserName + ' as ID = ' + response.data.user);
      this.router.navigateByUrl('/audiologist');
    },
      error => {
        this.authenticationFlag = false;
        console.log('failed log for ' + this.audiologistUserName);
        this.audiologistPassword = '';
      });
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
