import { Injectable } from '@angular/core';
import { Utilities } from '../common/utlilities';

// Holds the completed question numbers and their respective answers
@Injectable()
export class TfiDataService {
  public dataRecord: Array <{state: number, choice: number}> = [];
  constructor() { }
  // Push the question number and answer onto the stack

  public onInit() {
    console.log('INIT', sessionStorage);
    if (JSON.parse(Utilities.getSessionStorage('tfi-dataRecord'))) {
      this.dataRecord = JSON.parse(Utilities.getSessionStorage('tfi-dataRecord'));
    }
  }

  public saveData(state: number, choice: number): void {
    if (this.dataRecord.length > 0) {
      let index: number = this.dataRecord.findIndex((x) => x.state === state);
      if (index !== -1) {
        this.dataRecord.splice(index, 1);
      }
    }
    this.dataRecord.push({state, choice});

    this.updateSessionStorage();
    console.log(this.dataRecord);
  }

  // Remove a question number and answer from the stack
  public moveStateBackward(currentState: number): void {
    if (this.dataRecord.length <= 1) {
      return null;
    }

    let index: number = this.dataRecord.findIndex((x) => x.state === currentState);
    if (index !== -1) {
      this.dataRecord.splice(index, 1);
    }

    this.updateSessionStorage();

    console.log(this.dataRecord);
  }

  public populateAnswers(state: number, percent: boolean): string {
    let choice = this.dataRecord.find((x) => x.state === state);

    if (choice) {
      return choice.choice.toString();
    } else {
      return '0';
    }
  }

  public updateSessionStorage(): void {
    Utilities.setSessionStorage('tfi-dataRecord', JSON.stringify(this.dataRecord));
  }

  public clearHistory(): void {
    this.dataRecord = [];
  }
}
