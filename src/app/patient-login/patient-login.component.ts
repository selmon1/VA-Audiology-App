import { Component, OnInit } from '@angular/core';
import { TsScreenerDataService } from '../services/ts-screener-data.service';
import { Router } from '@angular/router';
import { Utilities } from '../common/utlilities';
import { PatientResponse } from '../../../api-objects/patientResponse';

@Component({
  selector: 'patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.css']
})
export class PatientLoginComponent implements OnInit {
  public patients: Array<PatientResponse> = [];
  public currentPage: number = 0;
  public nextId: number = -1;
  public newFirst: string = '';
  public newLast: string = '';
  public newEmail: string = '';

  private nextURL: string = '/audiologist';

  constructor(private router: Router, public tsDataService: TsScreenerDataService) {
    this.tsDataService.onInit();
  }

  public ngOnInit() {
    let noData: boolean = this.tsDataService.dataRecord === null || this.tsDataService.dataRecord.length < 1;
    let noID: boolean = Utilities.getSessionStorage('patient-id') === null || Utilities.getSessionStorage('patient-id').length < 1;
    if(noData || !noID) {
      this.router.navigateByUrl(this.nextURL);
    }
    this.loadPatients();
    this.nextId = this.patients[this.patients.length - 1].patientid + 1;
  }

  public createPatient() {
    // TODO: call create patient
    Utilities.setSessionStorage('patient-id', this.nextId.toString());
    this.router.navigateByUrl(this.nextURL);
  }

  public loadPatient(patient: PatientResponse) {
    Utilities.setSessionStorage('patient-id', patient.patientid.toString());
    this.router.navigateByUrl(this.nextURL);
  }

  private loadPatients() {
    this.currentPage = 0;
    // TODO: get patients from db
    this.patients = new Array<PatientResponse>();
    let patient: PatientResponse;
    let id = 1;
    for (let i = 0; i < 20; i++) {
      patient = new Object as PatientResponse;
      patient.deceased = Math.random() >= 0.5;
      patient.patientid = id;
      id++;
      patient.patientnotes = Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36) + ' ' + Math.random().toString(36);
      patient.firstname = Math.random().toString(36);
      patient.lastname = Math.random().toString(36);
      patient.email = Math.random().toString(36) + '@gmail.com';
      this.patients.push(patient);
    }
    this.patients.sort((a: PatientResponse, b: PatientResponse) => {
      return a.patientid - b.patientid;
    });
  }

  // pagination functions
  public prevPage(amt: number) {
    while (this.currentPage > 0 && amt > 0) {
      this.currentPage--;
      amt--;
    }
  }
  public nextPage(amt: number) {
    while ((this.currentPage + 1) * 10 < this.patients.length && amt > 0) {
      this.currentPage++;
      amt--;
    }
  }

}
