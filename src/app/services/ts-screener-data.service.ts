import { Injectable, OnInit } from '@angular/core';
import { Utilities } from '../common/utlilities';

// Stores data recorded from tinnitus screener questionaire.
@Injectable()
export class TsScreenerDataService {
  public history: number[] = [1];
  public dataRecord: Array<{state, choice}> = [];

  constructor() {}

  public onInit() {
    if (JSON.parse(Utilities.getSessionStorage('ts-dataRecord'))) {
      this.dataRecord = JSON.parse(Utilities.getSessionStorage('ts-dataRecord'));
    }

    console.log('parse: ', JSON.parse(Utilities.getSessionStorage('ts-history')));
    if (JSON.parse(Utilities.getSessionStorage('ts-history'))) {
      this.history = JSON.parse(Utilities.getSessionStorage('ts-history'));
    }
  }

  // saves the state movement history as well as state/choice pairs.
  public saveData(state: number, selection: string): void {
    let initialState = this.history[this.history.length - 1];

    // if state already exists in data record then overwrite.
    let index: number = this.dataRecord.findIndex((x) => x.state === initialState);
    if (index !== -1) {
      this.dataRecord.splice(index, 1);
    }

    this.dataRecord.push({state: initialState, choice: selection});
    this.history.push(state);

    this.updateSessionStorage();
    console.log(this.history);
    console.log(this.dataRecord);
  }

  public moveStateBackward(currentState: number): any {
    if (this.history.length <= 1) {
      return null;
    }
    // If a record entry for the current state exists then remove.
    let index: number = this.dataRecord.findIndex((x) => x.state === currentState);
    if (index !== -1) {
      this.dataRecord.splice(index, 1);
    }

    this.history.pop();

    this.updateSessionStorage();
    console.log(this.history);
    console.log(this.dataRecord);

    // Remove most recent history recording.
    return this.history[this.history.length - 1];
  }

  public populateAnswers(state: number): string {
    if (!this.dataRecord) {
      return '';
    }
    let choice = this.dataRecord.find((x) => x.state === state);

    if (choice) {
      return choice.choice;
    } else {
      return '';
    }
  }

  public updateSessionStorage(): void {
    Utilities.setSessionStorage('ts-dataRecord', JSON.stringify(this.dataRecord));
    Utilities.setSessionStorage('ts-history', JSON.stringify(this.history));
  }

  public clearHistory(): void {
    this.history = [1];
    this.dataRecord = [];
  }
}
