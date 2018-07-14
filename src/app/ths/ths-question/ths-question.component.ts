import { Component, Input, Output, EventEmitter, ViewChild, ContentChild, OnInit } from '@angular/core';
import { ThsAnswerStrings } from '../../common/custom-resource-strings';
import { ThsDataService } from '../../services/ths-data.service';

@Component({
  selector: 'ths-question',
  styleUrls: ['./ths-question.component.css'],
  template: `
    <nav class="navbar navbar-fixed-top" id="navigation">
      <div class="container-fluid">
        <div class="navbar-header">
          <a href="#" class="btn btn-info btn-lg">
            <span class="glyphicon glyphicon-home"></span> Home
          </a>
        </div>
      </div>
  </nav>
    
    <h2 class="questionHeader">{{question}}</h2>
    <div *ngIf="question !== 'Please list two examples of sounds that are too loud or uncomfortable for you, but seem normal to others:'; else input_questions" class="row">
      <div class="col-sm-4 col-sm-offset-3 col-xs-offset-2 questionFont">
        <div class="form-check">
          <mat-radio-group [(ngModel)]="selectedValue" class = "options" >
            <mat-radio-button value="{{radio1}}">{{radio1}}</mat-radio-button>
            <mat-radio-button value="{{radio2}}">{{radio2}}</mat-radio-button>
            <mat-radio-button value="{{radio3}}">{{radio3}}</mat-radio-button>
            <mat-radio-button value="{{radio4}}">{{radio4}}</mat-radio-button>
            <mat-radio-button value="{{radio5}}">{{radio5}}</mat-radio-button>
          </mat-radio-group>
        </div>
      </div>
    </div>
    <ng-template #input_questions>
    <div class="col-sm-3"></div>
    <div class="col-sm-6">
      <form class="inputForm">
        <mat-form-field class="fields">
        <textarea autofocus="true" matInput placeholder="Example 1 & 2:" value="{{selectedValue}}" [(ngModel)]="selectedValue" name="textBox"></textarea>
        </mat-form-field><br>
      </form>
      </div>
    <div class="col-sm-3"></div>
    </ng-template>
    <div class="col-sm-6 col-sm-offset-3">
    <p *ngIf="state === 9" class="extra">{{answerStrings.note}}</p>
    <p *ngIf="state === 10" class="extra">{{answerStrings.examples}}</p>
    </div>
    <div class="row">
      <div class="col-sm-6 col-sm-offset-3 sectionWrap" style="padding-top: 2%;">
        <button *ngIf="state !== 1; else disabled_btn" class="buttons1 btn btn-primary" (click)="onClickedBack.emit(selectedValue)">BACK</button>
        <ng-template #disabled_btn>
          <button class="buttons1 btn" (click)="onClickedBack.emit(selectedValue)" disabled>BACK</button>
        </ng-template>
        <button class="buttons2 btn btn-primary" (click)="onClickedNext.emit(selectedValue)">NEXT</button>
      </div>
    </div>
    `
})

// Represents a single TinnitusScreener Question.  Commonly used component that can adjust with inputs.
export class ThsQuestionComponent implements OnInit {
  public answerStrings: ThsAnswerStrings = new ThsAnswerStrings();

  @Input() public question: string = '';
  @Input() public radio1: string = this.answerStrings.NO;
  @Input() public radio2: string = this.answerStrings.SMALL_YES;
  @Input() public radio3: string = this.answerStrings.MODERATE_YES;
  @Input() public radio4: string = this.answerStrings.BIG_YES;
  @Input() public radio5: string = this.answerStrings.VERY_BIG_YES;
  @Input() public state: number = null;

  @Output() public onClickedBack: EventEmitter<string> = new EventEmitter<string>();
  @Output() public onClickedNext: EventEmitter<string> = new EventEmitter<string>();

  public selectedValue: string;

  constructor(private dataService: ThsDataService) {
    this.dataService.onInit();
  };

  public ngOnInit() {
    this.selectedValue = this.dataService.populateAnswers(this.state);
  }
}
