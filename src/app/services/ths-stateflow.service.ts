import { Injectable } from '@angular/core';
import { ThsDataService } from './ths-data.service';
import { ThsAnswerStrings } from '../common/custom-resource-strings';

@Injectable()
export class ThsStateflowService {
  private history: number[] = [0];
  private answerStrings: ThsAnswerStrings = new ThsAnswerStrings();

  constructor(private dataService: ThsDataService) { };

  // This fucntion will normally just move to the enxt question but depending on
  // the answer to the last question, the patient may be asked to fill out a short text box
  // with some info so it wil change the state based on that
  public moveStateForward(state: number, choice: string): number {
    this.dataService.saveData(state + 1, choice);
    if (state === 9) {
      if (choice[0] !== '0') {
        return 10;
      } else {
        return 11;
      }
    } else {
      return state + 1;
    }
  }
  // The data service does most of the work here but it will return the numbered state
  // to go back to. In this questionnaire's case, it'll be jsut the previous question
  public moveStateBackward(currentState: number): number {
    return this.dataService.moveStateBackward(currentState);
  }
}
