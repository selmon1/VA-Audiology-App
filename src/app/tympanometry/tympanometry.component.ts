import { Component, OnInit } from '@angular/core';
import { TestsDataService } from '../services/tests-data.service';
import { MatRadioChange } from '@angular/material';

@Component({
  selector: 'tympanometry',
  styleUrls: ['./tympanometry.component.css'],
  template: `
  <div class="tympanometry">
    <div class="head" align="center">TYMPANOMETRY</div>
    <div class="subhead" align="left">TYPE</div>
    <div>
      <mat-radio-group class="radio">
        <mat-radio-button *ngFor="let choice of choices" [value]="choice" (change)="typeChange($event)">
          {{choice}}
        </mat-radio-button>
      </mat-radio-group>
    </div>
  </div>
  `
})
export class TympanometryComponent implements OnInit {

  /*
   * Data members for tympanometry radio buttons
   */
  public choices: string[] = [
    'Conductive Hearing Loss, Bilateral',
    'Conductive Hearing Loss, Unilateral Right',
    'Conductive Hearing Loss, Unilateral Left',
    'Sensorineural Hearing Loss, Bilateral',
    'Sensorineural Hearing Loss, Unilateral Right',
    'Sensorineural Hearing Loss, Unilateral Left'
  ];
  constructor(private dataService: TestsDataService) { }

  public ngOnInit() {
  }

  public typeChange(event: MatRadioChange) {
    this.dataService.saveData('tympanometryType', event.value);
  }

}
