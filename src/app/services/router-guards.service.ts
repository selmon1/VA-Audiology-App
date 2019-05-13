import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Utilities } from '../common/utlilities';
import { ServerAuthenticationService } from './server-authentication.service';
// import { SecurityService } from './security.service';

@Injectable()
export class RouterGuards implements CanActivate {

  constructor(
    public router: Router,
    private auth: ServerAuthenticationService,
    // public securityService: SecurityService
  ) { }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let url: string = state.url;

    // must always start at the home page or pick up where left off if the url is one of these
    if (url === '/appointments' || url === '/ts' || url === '/ths' || url === '/tfi' || url === '/thank-you' || url === '/summary') {
      let id = Utilities.getSessionStorage('patient-id');

      // if there is not an ID saved, a patient hasn't started so it routes back to home
      if (!id) {
        this.router.navigateByUrl('home');
      }
    }

    // if there is an id, checks if there's an appt type set
    if (url === '/ts' || url === '/ths' || url === '/tfi' || url === '/thank-you' || url === '/summary') {
      let appt = Utilities.getSessionStorage('appt');
      if (!appt) {
        this.router.navigateByUrl('appointments');
      }
    }

    // restrict access to audiologist pages
    if (url === '/audiologist') {
      let userId = Utilities.getSessionStorage('userId');
      let sessionId = Utilities.getSessionStorage('sessionId');
      if (!userId || !sessionId) {
        this.router.navigateByUrl('aud-login');
      }
    }
    return true;
  }
}
