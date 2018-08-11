import { Component, Input, Output, EventEmitter, ViewChild, ContentChild, OnInit, AfterViewInit } from '@angular/core';
import { TsScreenerDataService } from '../../services/ts-screener-data.service';

@Component({
  selector: 'screener-question',
  styleUrls: ['./ts-screener-question.component.css'],
  template: `
    <h2 style="color: white;" align="center">{{statement}}</h2>
    <h2 style="color: white;" align="center">{{question}}</h2>
    <div class="radio-{{questionType}} col-sm-4 col-sm-offset-4 col-xs-offset-4">
      <div class="btn2">
        <button class="btn1" (click) = "answer_yes()">{{radio1}}</button> <br>
        <button class="btn1" (click)="answer_no()">{{radio2}}</button> <br>
        <span *ngIf="radio3"><button class="btn1" (click)="answer_sometimes()">{{radio3}}</button></span>
      </div>
    </div>
    <div class="row">
      <div *ngIf="state !== 1; else no_back_btn" class="col-sm-6 col-sm-offset-3" style="padding-top: 2%;">
        <button class="buttons1 btn btn-primary" (click)="onClickedBack.emit(selectedValue)">BACK</button>
        <button class="buttons2 btn btn-primary" (click)="onClickedNext.emit(selectedValue)">NEXT</button>
      </div>
      <ng-template #no_back_btn>
        <div class="col-sm-6 col-sm-offset-3" style="text-align: center; padding-top: 2%;">
          <button class="button-next-only btn btn-primary" (click)="onClickedNext.emit(selectedValue)">NEXT</button>
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

  public answer_yes(){
   this.selectedValue = this.radio1;
  }

  public answer_no(){

    this.selectedValue = this.radio2;
  }

  public answer_sometimes(){
    this.selectedValue = this.radio3;
  }
}
