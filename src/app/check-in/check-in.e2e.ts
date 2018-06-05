/*
import { browser, by, element } from 'protractor';
import { LoginPage } from './check-in.po';
import 'tslib';

describe('Login', function() {
  let login: LoginPage;
  beforeEach(() => {
    login = new LoginPage();
    login.navigateTo();
  });

  it('should login as patient', async function() {
    login.getTextBox().sendKeys('4444');
    login.getSignInBtn().click();
    expect(login.getUrl()).toEqual('http://localhost:3000/appointments');
  });
  it('should login as audiologist', async function() {
    login.getTextBox().sendKeys('994444');
    login.getSignInBtn().click();
    expect (login.getUrl()).toEqual('http://localhost:3000/audiologist');
  });
  it('return to home page', async function() {
    element(by.css('[class="logo"]')).click();
    expect (login.getUrl()).toEqual('http://localhost:3000/home');
  });
  it('should not login', async function() {
    login.getTextBox().sendKeys('9948444');
    login.getSignInBtn().click();
    element(by.css('[class="failLogIn"]')).isDisplayed();
    expect(login.getUrl()).toEqual('http://localhost:3000/login');
  });
});
*/
