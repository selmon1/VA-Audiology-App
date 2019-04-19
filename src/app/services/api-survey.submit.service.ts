import { Injectable } from '@angular/core';
import { Utilities } from '../common/utlilities';

// TODO: Better name for this!
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
    let testData = Utilities.getSessionStorage('tests-data');

    if(testData == null) {
      console.log('No test data!');
      return false;
    }

    console.log(testData);
    let result = new SurveyInstanceJSON;
    console.log(JSON.stringify(result));
    return false;
  }
}
