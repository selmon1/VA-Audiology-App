import { browser, by, element } from 'protractor';
import 'tslib';

/*
  Helper class for accessing elements on THS page
*/
export class ThsPage {

  public navigateTo() {
    browser.get('/');
    browser.get('/ths');
    return element(by.linkText('ths'));
  }

  public getTitleText() {
    return element(by.xpath('/html/body/app/main/app-ths/h3')).getText();
  }

  public getQuestionText() {
    return element(by.tagName('h2')).getText();
  }

  // For testing just do radio button 4 for now.
  public getAnswer(choice: number) {
    // radio button for answer starts at 2. first choice is  mat-radio-2
    let actual = choice + 2;
    let xPath = '//html/body/app/main/app-ths/ths-question/div[1]/div/div/mat-radio-group';
    // radio button ID is different for each question. Will need to update

    let radio = element(by.xpath(xPath)).all(by.id('mat-radio-5')).get(0);
    return radio;
  }

  // return 5 for now
  public getNumberOfChoices() {
    return 5;
  }

  public getBackButton() {
    return element(by.buttonText('BACK'));
  }

  public getNextButton() {
    return element(by.buttonText('NEXT'));
  }

}
