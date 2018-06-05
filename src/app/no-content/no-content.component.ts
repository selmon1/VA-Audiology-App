import { Component } from '@angular/core';

@Component({
  selector: 'no-content',
  template: `
    <div class="container">
      <div class="header">
        <div class="row">
          <div class="col-sm-6 col-md-6 col-lg-4" style="text-align: left;">
            <logo logoRouteOption="1"></logo>
          </div>
        </div>
      </div>
      <div class="img-container">
        <div class="row">
          <div class="col-xs-6 col-sm-4 col-md-4 col-lg-2 col-xs-offset-3 col-lg-offset-5 col-md-offset-4 col-sm-offset-4">
            <img class="not-found" src="/assets/images/404_white.png" alt="404 NOT FOUND">
          </div>
        </div>
        </div>
    </div>
  `,
  styleUrls: ['./no-content.component.css']
})
export class NoContentComponent {

}
