import { Injectable } from '@angular/core';
import { Utilities } from '../common/utlilities';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { stringify } from 'querystring';

// Holds test results entered
@Injectable()
export class TestsDataService {
  public data: Array <{name: string, value: string}> = [];
  observableData: BehaviorSubject<{ name: string; value: string; }[]>;

  constructor() {
    this.observableData = new BehaviorSubject<{name: string, value: string}[]>(this.data);
  }

  public onInit() {
    if(JSON.parse(Utilities.getSessionStorage('tests-data'))) {
      this.data = JSON.parse(Utilities.getSessionStorage('tests-data'));
    }
  }

  public saveData(name: string, value: string): void {
    if(this.data.length > 0) {
      let index: number = this.data.findIndex((x) => x.name === name);
      if(index !== -1) {
        this.data.splice(index, 1);
      }
    }
    this.data.push({name, value});
    this.updateSessionStorage();
    this.observableData.next(this.data);
  }

  public updateSessionStorage(): void {
    Utilities.setSessionStorage('tests-data', JSON.stringify(this.data));
  }
}
