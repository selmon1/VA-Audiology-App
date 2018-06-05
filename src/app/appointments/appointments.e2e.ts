/* import { browser, by, element } from 'protractor';
import { AppointmentsPage } from './appointments.po';
import 'tslib';

describe('Appointments', function() {
  let appointments: AppointmentsPage;
  beforeEach(() => {
    // browser.get('/');
    appointments = new AppointmentsPage();
    appointments.navigateTo();
  });

  it('should click Initial Assessment', async function() {
    appointments.getInitialAssessment().click();
    expect(appointments.getUrl()).toEqual('http://localhost:3000/ts');
  });
  it('should click Hearing Aids Fitting', async function() {
    appointments.getHearingAidsFitting().click();
    expect(appointments.getUrl()).toEqual('http://localhost:3000/ts');
  });
  it('should click Hearing Aids Follow-Up Visit', async function() {
    appointments.getHearingAidsFollowUp().click();
    expect(appointments.getUrl()).toEqual('http://localhost:3000/ts');
  });
  it('should click home page', async function() {
    element(by.css('[class="logo"]')).click();
    expect(appointments.getUrl()).toEqual('http://localhost:3000/home');
  });

});
*/
