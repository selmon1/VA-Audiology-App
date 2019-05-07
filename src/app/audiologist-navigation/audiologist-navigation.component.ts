import { Router } from '@angular/router';
import { ViewChild, Component, ViewEncapsulation } from '@angular/core';
import { AudiologistSummaryComponent, tfiNames } from '../audiologist-summary/audiologist-summary.component';
import { Utilities } from '../common/utlilities';
import { State, StatesEnum, TabsEnum } from './navigation-aids';
import { Appointment } from 'api-objects/Appointment';

@Component({
  selector: 'audio-navigation',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./audiologist-navigation.component.css'],
  templateUrl: './audiologist-navigation.component.html',
})
/**
 * This function controls the navigation sidebar.
 * Either to show the sidebar or to hide the sidebar.
 * active: boolean is a local variable will be switch between true and false to trigger the function.
 */
export class AudiologistNavigationComponent {
  get TabsEnum() { return TabsEnum; }
  public patientID: string = Utilities.getSessionStorage('patient-id');
  public active: boolean = true;
  public scale: number = 0.55;
  public state: State = new State();
  @ViewChild(AudiologistSummaryComponent) private summaryComponent: AudiologistSummaryComponent;

  constructor(private router: Router) {
  }

  public ngOnInit() {
    if(this.summaryComponent.ts === '' || this.summaryComponent.ts === null) {
      this.state.determineState(false);
    } else {
      this.state.determineState(true, false);
    }
  }

  public onToggle() {
    if (!this.active) {
      this.active = true;
      console.log('is active');
    } else {
      this.active = false;
      console.log('is inactive');
    }
  }

  public submitSurvey() {
    if (this.summaryComponent != null) {
      this.summaryComponent.submitSurvey();
    }
  }

  public clearData() {
    // clear all patient data in memory
    let sessionKeys: string[] = [
      'patient-id', 
      'tests-data', 
      'tfi-dataRecord', 
      'ths-dataRecord', 
      'ths-history', 
      'ts-dataRecord', 
      'ts-history'
    ];
    sessionKeys.forEach( (value) => {
      Utilities.removeItemFromSessionStorage(value);
    });
    this.patientID = null;
    this.state.determineState(false);
  }

  public logout() {
    this.clearData();
    Utilities.removeItemFromSessionStorage('audiologist-pin');
    Utilities.removeItemFromSessionStorage('permissions');
    this.router.navigateByUrl('/home');
  }

  public onApptLoad(appt: Appointment) {
    this.patientID = appt.patientid.toString();
    this.summaryComponent.patientID = appt.patientid.toString();
    this.summaryComponent.ts = appt.ts_type;
    // Load the rest of the summary...
    this.state.determineState(true, true);
  }
}
