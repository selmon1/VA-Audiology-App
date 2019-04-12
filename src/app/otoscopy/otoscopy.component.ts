import { Component, OnInit } from '@angular/core';
import { MatRadioChange } from '@angular/material';
import { TestsDataService } from '../services/tests-data.service';

@Component({
  selector: 'otoscopy',
  styleUrls: ['./otoscopy.component.css'],
  template: `
  <div class="otoscopy">
    <div class="head" align="center">OTOSCOPY</div>
    <div class="subhead" align="left">TYPE</div>
    <div class="radio">
      <mat-radio-group>
          <mat-radio-button value="{{normal}}" (change)="typeChange($event)">{{normal}}</mat-radio-button> <br>
          <mat-radio-button value="{{notNormal}}" (change)="typeChange($event)">{{notNormal}}</mat-radio-button> <br>
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

  constructor(private dataService: TestsDataService) { }

  public ngOnInit() {
  }

  public typeChange(event: MatRadioChange) {
    this.dataService.saveData('otoscopyType', event.value);
  }

}
