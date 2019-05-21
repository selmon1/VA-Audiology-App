import { Component, OnInit } from '@angular/core';
import { TsScreenerDataService } from '../services/ts-screener-data.service';
import { Router } from '@angular/router';
import { Utilities } from '../common/utlilities';
import { PatientResponse } from '../../../api-objects/patientResponse';
import { AdminPatientService } from '../services/admin-patient.service';
import { CreatePatientData } from '../../../api-objects/AdminPatient';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'patient-login',
  templateUrl: './patient-login.component.html',
  styleUrls: ['./patient-login.component.css']
})
export class PatientLoginComponent implements OnInit {
  public patients: Array<PatientResponse> = [];
  public newPatientData: CreatePatientData = new CreatePatientData();

  public currentPage: number = 0;
  public newFirst: string = '';
  public newLast: string = '';
  public newEmail: string = '';

  private nextURL: string = '/audiologist';

  constructor(private router: Router, private adminPatientService: AdminPatientService, private notificationService: NotificationService, public tsDataService: TsScreenerDataService) {
    this.tsDataService.onInit();
  }

  public ngOnInit() {
    let noData: boolean = this.tsDataService.dataRecord === null || this.tsDataService.dataRecord.length < 1;
    let noID: boolean = Utilities.getSessionStorage('patient-id') === null || Utilities.getSessionStorage('patient-id').length < 1;
    if (noData || !noID) {
      this.router.navigateByUrl(this.nextURL);
    }
    this.loadPatients();
  }

  public createPatient() {
    this.adminPatientService.createPatient(this.newPatientData).subscribe(
      (response) => {
        // if createPatient succeeds
        Utilities.setSessionStorage('patient-id', response.data.patientid.toString());
        this.notificationService.showSuccess('Patient ID: ' + response.data.patientid + ' was successfully create.');
        this.router.navigateByUrl(this.nextURL);
      }
    )
    // else display error
  }

  public loadPatient(patient: PatientResponse) {
    Utilities.setSessionStorage('patient-id', patient.patientid.toString());
    this.router.navigateByUrl(this.nextURL);
  }

  private loadPatients() {
    this.currentPage = 0;

    this.patients = new Array<PatientResponse>();
    this.adminPatientService.getPatients().subscribe(
      (response) => {
        this.patients = response.data;

        this.patients.sort((a: PatientResponse, b: PatientResponse) => {
          return a.patientid - b.patientid;
        });
      }
    );
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
