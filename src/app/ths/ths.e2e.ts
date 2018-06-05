/*  Commenting out for now.

import { browser } from 'protractor';
import { ThsQuestionStrings, ThsAnswerStrings } from '../common/custom-resource-strings';
import { ThsPage } from './ths.po';

describe('THS', function() {

  let Ths: ThsPage;
  let questionStrings: ThsQuestionStrings;
  beforeEach(() => {
    Ths = new ThsPage();
    questionStrings = new ThsQuestionStrings();
  });

  it('Should show title', async function() {
    Ths.navigateTo();
    await expect(Ths.getTitleText()).toEqual('Tinnitus & Hearing Survey');
  });

  it('Should show five answer choices', async function() {
    await expect(Ths.getNumberOfChoices()).toEqual(5);
  });

  it('Should show question text', async function() {
    await expect(Ths.getQuestionText()).toEqual(questionStrings.question1);
  });

  it('Should show NEXT button', async function() {
    await expect(Ths.getBackButton().getText()).toEqual('BACK');
  });

  it('Should show NEXT button', async function() {
    await expect(Ths.getNextButton().getText()).toEqual('NEXT');
  });

  // click through all the anwer choices for now
  it('Should select answer choice ', async function() {
    // await Ths.getAnswer(0).click();
    // await Ths.getAnswer(1).click();
    // await Ths.getAnswer(2).click();
    await Ths.getAnswer(3).click();
    await Ths.getNextButton().click();
    await expect(Ths.getQuestionText()).toEqual(questionStrings.question2);
    // await browser.pause();
  });

});
*/
