import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

export interface AdminPatientListData {
  patientid: string;
}

@Component({
  selector: 'admin-patient-list-modal',
  templateUrl: './admin-patient-list-modal.component.html',
  styleUrls: ['./admin-patient-list-modal.component.css']
})
export class AdminPatientListModalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: AdminPatientListData) { }

  ngOnInit() {
  }

}
