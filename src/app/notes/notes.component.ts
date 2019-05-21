import { Component, OnInit } from '@angular/core';
import { AdminPatientService } from '../services/admin-patient.service';

@Component({
    selector: 'notes',
    templateUrl: './notes.component.html',
    styleUrls: ['./notes.component.css']
})

export class NotesComponent implements OnInit {

    public content: string = '';

    constructor(private adminPatientService: AdminPatientService) { }

    public ngOnInit() {}

    // Calls getPatient service, and retrieves patient notes.
    public loadNotes(patientID: number): void {
        this.adminPatientService.getPatient(patientID).subscribe( (result) => {
            this.content = result.data[0].patientnotes;
        }, (error) => {
            console.error('Loading notes Failed!', error.statusText);
        });
    }
    // calls the updateNotes service from patientAdminService
    public submitNote(patinetID: number): void {
        if (typeof(this.content) === 'string') {
            this.adminPatientService.updateNotes(patinetID, this.content).subscribe( (_) => {
                console.log('Notes Updated Successfully');
            }, (error) => {
                console.log('Error Updating Notes', error.error);
            });
        }
    }
}
