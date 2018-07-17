import { Injectable } from '@angular/core';
import { TsScreenerDataService } from './ts-screener-data.service';
import { TsScreenerAnswerStrings } from '../common/custom-resource-strings';
import { Utilities } from '../common/utlilities';

// Service that applies stateflow logic as according to the specs given by our sponsor.
@Injectable()
export class TsScreenerStateflowService {
  private answerStrings: TsScreenerAnswerStrings = new TsScreenerAnswerStrings();

  constructor(private dataService: TsScreenerDataService) {};
  public moveStateForward(state: number, choice: string): number {
    switch (state) {
      case 1:
        if (choice === this.answerStrings.YES) {
          this.dataService.saveData(2, choice);
          return 2;
        } else {
          Utilities.setSessionStorage('nextComponent', 'true');
          this.dataService.saveData(7, choice);
          return 7;
        }
      case 2:
        this.dataService.saveData(3, choice);
        return 3;
      case 3:
        if (choice === this.answerStrings.SOMETIMES_OCCASIONALLY) {
          this.dataService.saveData(4, choice);
          return 4;
        } else {
          this.dataService.saveData(7, choice);
          return 7;
        }
      case 4:
        if (choice === this.answerStrings.YES_SOMETIMES) {
          this.dataService.saveData(5, choice);
          return 5;
        } else if (choice === this.answerStrings.NO) {
          this.dataService.saveData(6, choice);
          return 6;
        } else {
          this.dataService.saveData(7, choice);
          return 7;
        }
      case 5:
        if (choice === this.answerStrings.YES) {
          this.dataService.saveData(6, choice);
          return 6;
        } else {
          this.dataService.saveData(7, choice);
          return 7;
        }
      case 6:
          this.dataService.saveData(7, choice);
          return 7;
      case 7:
          let x: number = this.dataService.moveStateBackward(state);
          return x;
      default:
        return 7;
    }
  }

  public moveStateBackward(currentState: number): number {
    return this.dataService.moveStateBackward(currentState);
  }
}
