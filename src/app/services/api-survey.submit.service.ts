import { Injectable } from '@angular/core';
import { Utilities } from '../common/utlilities';

@Injectable()
export class SurveySubmitHandler {
  public submitSurvey() : boolean {
    alert('Did submission!');
    let testData = Utilities.getSessionStorage('tests-data');

    if(testData == null) {
      console.log('No test data!');
      return false;
    }

    console.log(testData);
    return false;
  }
}
