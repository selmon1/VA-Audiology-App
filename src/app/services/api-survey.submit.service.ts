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

    if(testData == null) {
      return false;
    }

    let result = new SurveyInstanceJSON;
    result.patientSurvey = this.buildPatientSurveyJSON(testData);
    result.patient = new PatientJSON;

    if(this.getPropertyValue(testData, 'audiogramType') !== '') {
      console.log('Got the value!');
    } else {
      console.log('Did not get the value!');
    }

    console.log(testData);
    //console.log(JSON.stringify(result));
    return true;
  }

  buildPatientSurveyJSON(testData) : PatientSurveyJSON {
    if(testData == null)
      return null;

    let result : PatientSurveyJSON = new PatientSurveyJSON;

    result.audiogram = this.getPropertyValue(testData, 'audiogramType');

    result.otoscopy = this.getPropertyValue(testData, 'otoscopyType');
    result.typanometry = this.getPropertyValue(testData, 'tympanometryType');

    result.rightEarHighFreqSeverity = this.getPropertyValue(testData, 'rightHighSev');
    result.rightEarLowFreqSeverity = this.getPropertyValue(testData, 'rightLowSev');
    result.rightEarHighFreqConfiguration = this.buildFreqConfig(testData, 'rightHigh');
    result.rightEarLowFreqConfiguration = this.buildFreqConfig(testData, 'rightLow');

    result.leftEarHighFreqSeverity = this.getPropertyValue(testData, 'leftHighSev');
    result.leftEarLowFreqSeverity = this.getPropertyValue(testData, 'leftLowSev');
    result.leftEarHighFreqConfiguration = this.buildFreqConfig(testData, 'leftHigh');
    result.leftEarLowFreqConfiguration = this.buildFreqConfig(testData, 'leftLow');

    console.log(result);

    return result;
  }

  buildFreqConfig(testData, configType : string) : string {
    let result : string = '';

    let symmetric = this.getPropertyValue(testData, configType + 'ConfigSymmetric');
    let asymmetric = this.getPropertyValue(testData, configType + 'ConfigAsymmetric');
    let progressive = this.getPropertyValue(testData, configType + 'ConfigProgressive');
    let sudden = this.getPropertyValue(testData, configType + 'ConfigSudden');
    let flat = this.getPropertyValue(testData, configType + 'ConfigFlat');
    let rising  = this.getPropertyValue(testData, configType + 'ConfigRising');
    let cookieBite = this.getPropertyValue(testData, configType + 'ConfigCookie Bite');
    let precipitous = this.getPropertyValue(testData, configType + 'ConfigPrecipitous');
    let noiseNotch = this.getPropertyValue(testData, configType + 'ConfigNoise-Notch');
    let corner = this.getPropertyValue(testData, configType + 'ConfigCorner');

    if(symmetric !== '' && symmetric !== 'false') {
      result = (result.concat('Symmetric')).concat(';');
    }

    if(asymmetric !== '' && asymmetric !== 'false') {
      result = (result.concat('Asymmetric')).concat(';');
    }

    if(progressive !== '' && progressive !== 'false') {
      result = (result.concat('Progressive')).concat(';');
    }

    if(sudden != '' && sudden !== 'false') {
      result = (result.concat('Sudden')).concat(';');
    }

    if(flat != '' && flat !== 'false') {
      result = (result.concat('Flat')).concat(';');
    }

    if(rising != '' && rising !== 'false') {
      result = (result.concat('Rising')).concat(';');
    }

    if(cookieBite != '' && cookieBite !== 'false') {
      result = (result.concat('CookieBite')).concat(';');
    }

    if(precipitous != '' && precipitous !== 'false') {
      result = (result.concat('Precipitous')).concat(';');
    }

    if(noiseNotch != '' && noiseNotch !== 'false') {
      result = (result.concat('NoiseNotch')).concat(';');
    }

    if(corner != '' && corner !== 'false') {
      result = (result.concat('Corner')).concat(';');
    }

    return result;
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
}
