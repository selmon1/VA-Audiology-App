import { Component, Input, Output, EventEmitter, ViewChild, ContentChild, OnInit, AfterViewInit } from '@angular/core';
import { TsScreenerDataService } from '../../services/ts-screener-data.service';

@Component({
  selector: 'screener-question',
  styleUrls: ['./ts-screener-question.component.css'],
  template: `
    <h2 style="color: white;" align="center">{{statement}}</h2>
    <h2 style="color: white;" align="center">{{question}}</h2>
    <div class="radio-{{questionType}} col-sm-4 col-sm-offset-4 col-xs-offset-4">
      <div class="form-check">
      <mat-radio-group [(ngModel)]="selectedValue" class = "options" >
        <mat-radio-button value="{{radio1}}">{{radio1}}</mat-radio-button> <br>
        <mat-radio-button value="{{radio2}}">{{radio2}}</mat-radio-button> <br>
          <span *ngIf="radio3"><mat-radio-button value="{{radio3}}">{{radio3}}</mat-radio-button></span>
      </mat-radio-group>
      </div>
    </div>
    <div class="row">
      <div *ngIf="state !== 1; else no_back_btn" class="col-sm-6 col-sm-offset-3" style="padding-top: 2%;">
        <button class="buttons1 btn btn-primary" (click)="onClickedBack.emit(selectedValue)">BACK</button>
        <button class="buttons2 btn btn-primary" (click)="onClickedNext.emit(selectedValue)">NEXT</button>
			</div>
			<ng-template #no_back_btn>
				<div class="col-sm-6 col-sm-offset-4" style="padding-top: 2%;">
					<button class="buttons1 btn btn-primary" (click)="onClickedNext.emit(selectedValue)">NEXT</button>
				</div>
			</ng-template>
    </div>
  `
})

export class TsScreenerQuestionComponent implements OnInit {
  @Input() public statement: string = 'During the PAST YEAR:';
  @Input() public question: string = '';
  @Input() public questionType: number = 1;
  @Input() public showThirdRadioButton: boolean = false;
  @Input() public radio1: string = 'YES';
  @Input() public radio2: string = 'NO';
  @Input() public radio3: string = null;
  @Input() public state: number = null;

  @Output() public onClickedBack: EventEmitter<string> = new EventEmitter<string>();
  @Output() public onClickedNext: EventEmitter<string> = new EventEmitter<string>();

  public selectedValue: string;

  constructor(private dataService: TsScreenerDataService) {
    this.dataService.onInit();
  };

  public ngOnInit() {
    this.selectedValue = this.dataService.populateAnswers(this.state);
  }
}
