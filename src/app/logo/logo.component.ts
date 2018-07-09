import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Utilities } from '../common/utlilities';

@Component({
  selector: 'logo',
  template: `
      <div>
        <img  (click)="onClick()" class="logo {{this.view || ''}}" [src]="imgLink" alt="Logo"/>
      </div>
  `,
  styleUrls: ['./logo.component.css']
})

export class LogoComponent {
    @Input() public logoRouteOption: string;
    @Input() public view: string;
    @Input() public imgLink = 'assets/images/logo.png';
    /*
      #1 - route to "home page"
      #2 - display logo image with "HOME" text
    */
    constructor(private router: Router) {
    }

    /**
     * This function is called when the logo image is clicked.
     * #1 indicating - the logo button is enabled, and routes to the "home" page
     * #2 indicating - the logo button is disabled, it stays on the current page.
     */
    public onClick() {
      if (this.logoRouteOption === '1') {
        Utilities.removeItemFromSessionStorage('audiologist-pin'); // this is for navigating away from audiologist page
        this.router.navigateByUrl('/home');
        console.log('back to home page.');
      }
      if (this.logoRouteOption === '2') {
          console.log('stay put');
      }
    }
// tslint:disable-next-line:eofline
}
