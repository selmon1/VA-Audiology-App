import { Component, OnInit } from '@angular/core';
import { ThsQuestionStrings } from '../common/custom-resource-strings';
import { ThsStateflowService } from '../services/ths-stateflow.service';
import { Router } from '@angular/router';
import { RouterGuards } from '../services/router-guards.service';
import { Utilities } from '../common/utlilities';

@Component({
  selector: 'app-ths',
  styleUrls: ['./ths.component.css'],
  template: `
  <div class="row">
    <div class="col-sm-6 col-md-6 col-lg-4" style="text-align: left;">
        <logo logoRouteOption="2"></logo>
    </div>
  </div>
  <h3 class="titleFont">Tinnitus & Hearing Survey</h3>
  <ths-question *ngIf="currentState === 1" [state]="currentState" [question]="questionStrings.question1" (onClickedBack)="moveStateBackward()" (onClickedNext)="moveStateForward($event)"></ths-question>
  <ths-question *ngIf="currentState === 2" [state]="currentState" [question]="questionStrings.question2" (onClickedBack)="moveStateBackward()" (onClickedNext)="moveStateForward($event)"></ths-question>
  <ths-question *ngIf="currentState === 3" [state]="currentState" [question]="questionStrings.question3" (onClickedBack)="moveStateBackward()" (onClickedNext)="moveStateForward($event)"></ths-question>
  <ths-question *ngIf="currentState === 4" [state]="currentState" [question]="questionStrings.question4" (onClickedBack)="moveStateBackward()" (onClickedNext)="moveStateForward($event)"></ths-question>
  <ths-question *ngIf="currentState === 5" [state]="currentState" [question]="questionStrings.question5" (onClickedBack)="moveStateBackward()" (onClickedNext)="moveStateForward($event)"></ths-question>
  <ths-question *ngIf="currentState === 6" [state]="currentState" [question]="questionStrings.question6" (onClickedBack)="moveStateBackward()" (onClickedNext)="moveStateForward($event)"></ths-question>
  <ths-question *ngIf="currentState === 7" [state]="currentState" [question]="questionStrings.question7" (onClickedBack)="moveStateBackward()" (onClickedNext)="moveStateForward($event)"></ths-question>
  <ths-question *ngIf="currentState === 8" [state]="currentState" [question]="questionStrings.question8" (onClickedBack)="moveStateBackward()" (onClickedNext)="moveStateForward($event)"></ths-question>
  <ths-question *ngIf="currentState === 9" [state]="currentState" [question]="questionStrings.question9" (onClickedBack)="moveStateBackward()" (onClickedNext)="moveStateForward($event)"></ths-question>
  <ths-question *ngIf="currentState === 10" [state]="currentState" [question]="questionStrings.question10" (onClickedBack)="moveStateBackward()" (onClickedNext)="moveStateForward($event)"></ths-question>
`
})
export class ThsComponent implements OnInit {
  public currentState: number = 1;

  public questionStrings: ThsQuestionStrings = new ThsQuestionStrings();

  constructor(private stateMachine: ThsStateflowService,
              public router: Router) { };

  public ngOnInit(): void {
    if (Utilities.getSessionStorage('ths-currentState')) {
      this.currentState = parseInt(Utilities.getSessionStorage('ths-currentState'), 10);
      console.log('state', this.currentState);
    }

    // reset state to 1 if we are revisiting questionaire
    if (this.currentState === 11) {
      this.currentState = 1;
    }
  }

  // This function uses the stateflow service to determine what the previous state
  // should be (right now, it'll jsut be sequential) and then sets that as the current state
  // To the user it'll be reflected in hitting a back button to go back to their previous question
  public moveStateBackward(): void {
    let prevState: number = this.stateMachine.moveStateBackward(this.currentState);

    if (prevState) {
      this.currentState = prevState;
    }

    this.updateSessionStorage();
  }

  // This function takes in the answer the user chose from the radio buttons and
  // utilizes the stateflow service to move forward one question while saving the data.
  // however, if it is at the end, it will go to the tfi or, if the user selected no
  // on the ts, it will route to the thank you page
  public moveStateForward(choice: string): void {
    console.log(choice);
    if (!choice) {
      return;
    }

    let nextState: number = this.stateMachine.moveStateForward(this.currentState, choice);

    this.currentState = nextState;

    this.updateSessionStorage();
    // if the no was not selected for Q1 on TS, routes to tfi like normal
    // If it was, then tfi is skipped
    if (this.currentState === 11) {
        let nextComponent = Utilities.getSessionStorage('nextComponent'); // will be null if this doesn't exist (meaning it wasn't even set)

        if (nextComponent === 'true') { // if it is finished
            Utilities.removeItemFromSessionStorage('nextComponent'); // clears it right after use
            this.router.navigateByUrl('/thank-you');
        } else { // If it is not finished
            this.router.navigateByUrl('/tfi');
        }
    }
  }

  public updateSessionStorage(): void {
    Utilities.setSessionStorage('ths-currentState', this.currentState.toString());
  }
}
