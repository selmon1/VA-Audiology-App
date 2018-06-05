import { Component, OnInit } from '@angular/core';
import { TsScreenerAnswerStrings, TsScreenerQuestionStrings } from '../common/custom-resource-strings';
import { TsScreenerStateflowService } from '../services/ts-screener-stateflow.service';
import { TsScreenerQuestionComponent } from './ts-screener/ts-screener-question/ts-screener-question.component';
import { Router } from '@angular/router';
import { Utilities } from '../common/utlilities';

@Component({
  selector: 'screener',
  styleUrls: ['./ts-screener.component.css'],
  template: `
  <div class="row">
    <div class="col-sm-6 col-md-6 col-lg-4" style="text-align: left;">
        <logo logoRouteOption="2"></logo>
    </div>
  </div>
    <h3 style="color: white" align="center">Tinnitus Screener</h3>
    <screener-question *ngIf="currentState === 1" [questionType]="1" [question]="questionStrings.question1" [state]="currentState" (onClickedBack)="moveStateBackward()" (onClickedNext)="moveStateForward($event)"></screener-question>
    <screener-question *ngIf="currentState === 2" [questionType]="1" [question]="questionStrings.question2" [state]="currentState" (onClickedBack)="moveStateBackward()" (onClickedNext)="moveStateForward($event)"></screener-question>
    <screener-question *ngIf="currentState === 3" [questionType]="2" [question]="questionStrings.question3" [radio1]="answerStrings.ALWAYS" [radio2]="answerStrings.USUALLY" [radio3]="answerStrings.SOMETIMES_OCCASIONALLY"
                       [state]="currentState" (onClickedBack)="moveStateBackward()" (onClickedNext)="moveStateForward($event)"></screener-question>
    <screener-question *ngIf="currentState === 4" [questionType]="3" [question]="questionStrings.question4" [radio1]="answerStrings.YES_ALWAYS" [radio2]="answerStrings.YES_SOMETIMES" [radio3]="answerStrings.NO"
                       [state]="currentState" (onClickedBack)="moveStateBackward()" (onClickedNext)="moveStateForward($event)"></screener-question>
    <screener-question *ngIf="currentState === 5" [questionType]="1" [question]="questionStrings.question5" [state]="currentState" (onClickedBack)="moveStateBackward()" (onClickedNext)="moveStateForward($event)"></screener-question>
    <screener-question *ngIf="currentState === 6" [questionType]="2" [question]="questionStrings.question6" [radio1]="answerStrings.DAILY_OR_WEEKLY_BASIS" [radio2]="answerStrings.MONTHLY_OR_YEARLY_BASIS"
                       [state]="currentState" (onClickedBack)="moveStateBackward()" (onClickedNext)="moveStateForward($event)"></screener-question>
  `
})

// Parent shell class of the TinnitusScreener Questionaire.
export class TsScreenerComponent implements OnInit {
  public currentState: number = 1;

  public questionStrings: TsScreenerQuestionStrings = new TsScreenerQuestionStrings();
  public answerStrings: TsScreenerAnswerStrings = new TsScreenerAnswerStrings();

  constructor(private stateMachine: TsScreenerStateflowService,
              public router: Router) {};

  public ngOnInit() {
    if (Utilities.getSessionStorage('ts-currentState')) {
      this.currentState = parseInt(Utilities.getSessionStorage('ts-currentState'), 10);
      console.log('state', this.currentState);
    }
  }

  // receives new current state after moving backwards from services
  public moveStateBackward(): void {
    let prevState: number = this.stateMachine.moveStateBackward(this.currentState);

    if (prevState) {
      this.currentState = prevState;
    }

    this.updateSessionStorage();
  }

  // receives new current state after moving forwards from services
  public moveStateForward(choice: string): void {
    console.log(choice);
    if (!choice) {
      return;
    }

    let nextState: number = this.stateMachine.moveStateForward(this.currentState, choice);

    this.currentState = nextState;

    this.updateSessionStorage();

    if (this.currentState === 7) {
      this.router.navigateByUrl('/ths');
    }
  }

  public updateSessionStorage(): void {
    Utilities.setSessionStorage('ts-currentState', this.currentState.toString());
  }
}
