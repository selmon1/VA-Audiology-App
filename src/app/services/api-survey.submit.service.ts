import { Injectable } from '@angular/core';
import { Utilities } from '../common/utlilities';

class PatientJSON {
  patienID : number = 0;
  isDeceased : boolean = false;
}

class PatientSurveyJSON {
    otoscopy : string = '';
    typanometry : string = '';


    rightEarLowFreqSeverity : string = '';
    rightEarLowFreqConfiguration : string = '';
    rightEarHighFreqSeverity : string = '';
    rightEarHighFreqConfiguration : string = '';

    leftEarLowFreqSeverity : string = '';
    leftEarLowFreqConfiguration : string = '';
    leftEarHighFreqSeverity : string = '';
    leftEarHighFreqConfiguration : string = '';

    audiogram : string = '';


    thsSectionATotal : number = 0;
    thsSectionBTotal : number = 0;
    thsSectionCSeverity : string = '';


    tfiI : number = 0;
    tfiSc : number = 0;
    tfiC : number = 0;
    tfiSi : number = 0;
    tfiA : number = 0;
    tfiR : number = 0;
    tfiQ : number = 0;
    tfiE : number = 0;

    tfiOverallScore : number = 0;


    tsTinnitusType : string = '';
}

class SurveyInstanceJSON {
  patientSurvey : PatientSurveyJSON;
  patient : PatientJSON;
}

@Injectable()
export class SurveySubmitHandler {
  public submitSurvey() : boolean {
    alert('Did submission!');
    let testDataString = Utilities.getSessionStorage('tests-data');

    if(testDataString == null) {
      console.log('No test data!');
      return false;
    }

    let testData = JSON.parse(testDataString);

    let result = new SurveyInstanceJSON;
    result.patientSurvey = new PatientSurveyJSON;
    result.patient = new PatientJSON;

    if(this.getPropertyValue(testData, 'audiogramType') !== '') {
      console.log('Got the value!');
    } else {
      console.log('Did not get the value!');
    }

    console.log(testData);
    console.log(JSON.stringify(result));
    return false;
  }

  getPropertyValue(testData, property : string) : string {
    if(testData == null || testData.length < 1) {
      return '';
    }

    let result : string = '';

    let i : number;
    for(i = 0; i < testData.length; i++) {
      if(testData[i]['name'] === property) {
        result = testData[i]['value'];
        break;
      }
    }

    return result;
  }

  printTestDataNames(testData) {
    let i : number;
    for(i = 0; i < testData.length; i++) {
      console.log(testData[i]['name']);
    }
  }
}
