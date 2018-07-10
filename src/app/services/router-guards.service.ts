import { Injectable } from '@angular/core';
import {
  CanActivate, Router,
  ActivatedRoute,
  ActivatedRouteSnapshot,
  RouterStateSnapshot
} from '@angular/router';
import { Utilities } from '../common/utlilities';
// import { SecurityService } from './security.service';

@Injectable()
export class RouterGuards implements CanActivate {

  constructor(
    public router: Router,
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
      let pin = Utilities.getSessionStorage('audiologist-pin');
      // if there isn't a pin, then they obviously have not logged in yet
      if (!pin) {
        this.router.navigateByUrl('login');
      } else {
        // verify against static - navigate to check in if it's incorrect
        // This can be replaced in the future with a request to verify against DB
        if (pin !== '123456') {
         this.router.navigateByUrl('login');
        } else {
         return true;
        }
      }
    }
    return true;
  }
}
