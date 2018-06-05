import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'otoscopy',
  styleUrls: ['./otoscopy.component.css'],
  template: `
  <div class="otoscopy">
    <div class="head" align="center">OTOSCOPY</div>
    <div class="subhead" align="left">TYPE</div>
    <div class="radio">
      <mat-radio-group>
          <mat-radio-button value="{{normal}}">{{normal}}</mat-radio-button> <br>
          <mat-radio-button value="{{notNormal}}">{{notNormal}}</mat-radio-button> <br>
      </mat-radio-group>
    </div>
  </div>
  `
})
export class OtoscopyComponent implements OnInit {

  /*
   * Data members for otoscopy radio buttons
   */
  public normal: string = 'Normal';
  public notNormal: string = 'Not Normal';

  constructor() { }

  public ngOnInit() {
  }

}
