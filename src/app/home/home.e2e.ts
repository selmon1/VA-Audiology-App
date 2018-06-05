/*
import { browser } from 'protractor';
import { HomePage } from './home.po';
import 'tslib';

describe('Home', function() {
  let home: HomePage;

  beforeEach(() => {
    home = new HomePage();
    home.navigateTo();
  });

  // Protractor was not waiting for the page to fully load
  // thus, 'async' and 'await' is used throughtout the test.
  //
  it('Should show title text', async function() {
    await expect(home.getPageTitleText()).toEqual('VA Website!');
  });

  // Both Patient Check In and Audiologist Login uses the same component
  // so, only the two buttons functionalies are tested

  it('Should navigate to Patient Login page', async function() {
    await home.getPatientCheckInBtn().click();
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/login');
  });

  it('Should navigate to Audiologist Login page', async function() {
    await home.getAudiologistLoginBtn().click();
    await expect(browser.getCurrentUrl()).toEqual('http://localhost:3000/login');
  });

});
*/
