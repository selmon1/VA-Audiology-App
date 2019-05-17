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

    // checks if there's an appt type set
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
