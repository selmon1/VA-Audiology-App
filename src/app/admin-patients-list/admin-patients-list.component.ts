import { Component, OnInit } from '@angular/core';
import { PatientResponse } from '../../../api-objects/PatientResponse';
import { Response } from '../../../api-objects/GenericResponse';
import { MatDialog } from '@angular/material';
import { AdminPatientListModalComponent } from './admin-patient-list-modal/admin-patient-list-modal.component';
import { AdminPatientService } from '../services/admin-patient.service';
import { NotificationService } from '../services/notification.service';

@Component({
  selector: 'admin-patients-list',
  templateUrl: './admin-patients-list.component.html',
  styleUrls: ['./admin-patients-list.component.css']
})
export class AdminPatientsListComponent implements OnInit {
  public patients: Array<PatientResponse> = [];
  public currentPage: number = 0;
  public patientNotes: string = 'Patient Notes...';
  public selectedPat: number = -1;

  constructor(
    public dialog: MatDialog,
    private adminPatientService: AdminPatientService,
    private notificationService: NotificationService,
  ) { }

  public ngOnInit() {
  }

  public deletePatient(patient: PatientResponse) {
    const dialogRef = this.dialog.open(AdminPatientListModalComponent, { data: { patientid: patient.patientid } });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === 'confirm') {
        // delete this patient and all of its appointments
        this.adminPatientService.deletePatient(patient.patientid).subscribe(
          (_) => {
            this.notificationService.showSuccess("Patient Successfully Deleted");
            this.loadPatients();
          }
        );
      }
    });
  }

  public loadPatient(patient: PatientResponse) {
    // Load version of customer search with this patient ID and ability to delete an appointment
    console.log('load patient: ' + patient.patientid);
  }

  public loadPatients() {
    this.currentPage = 0;
    // Load patients from server
    this.adminPatientService.getPatients().subscribe(
      (response: Response<PatientResponse[]>) => {
        this.patients = response.data;
        this.patients.sort((a: PatientResponse, b: PatientResponse) => {
          return a.patientid - b.patientid;
        });
      }
    )
  }

  public changeSelectedPatient(notes: string, id: number) {
    this.patientNotes = notes;
    this.selectedPat = id;
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
