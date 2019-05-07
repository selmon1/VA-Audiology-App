import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Utilities } from '../common/utlilities';
import { CustomerSearchService } from './customer-search.service';
import { Appointment } from '../../../api-objects/Appointment';

@Component({
    selector: 'customer-search',
    templateUrl: './customer-search.component.html',
    styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {
  @Output() public appointment = new EventEmitter<Object>();
    public idSearch: string;
    public searchBtn: boolean = true; // Search button is disabled while querying DB
    public invalidID: boolean = false;
    public resultsTable: Appointment[] = [];

    public currentPage: number = 0;



    constructor(
        private customerSearchService: CustomerSearchService) { }

    public ngOnInit() {
    }

    // Gets JSON from queryDB() puts it into an array to create the table of appointments
    // sorts by date, most recent first.
    public patientSearch() {
        if (!this.validID()) { this.invalidID = true; return; };
        this.invalidID = false;
        this.searchBtn = false;
        this.getAppointments();

        this.searchBtn = true;
    }
    // Emits the selected appointment, so that audiologist-navigation can load the appointment data
    public loadAppt(appt: Appointment) {
        this.appointment.emit(appt);
        console.log('appt: ID-"' + appt.appointmentid + '"      Audiologist-"' + appt.authorityname + '"');
    }
    // pagination functions
    public prevPage(amt: number) {
        while (this.currentPage > 0 && amt > 0) {
            this.currentPage--;
            amt--;
        }
    }
    public nextPage(amt: number) {
        while ((this.currentPage + 1) * 10 < this.resultsTable.length && amt > 0) {
            this.currentPage++;
            amt--;
        }
    }

    // Add validation to patient ID
    private validID(): boolean {
        return this.idSearch !== undefined && this.idSearch !== '';
    }

    private getAppointments() {
        let appts: Appointment[] = [];
        this.customerSearchService.searchApiService(this.idSearch).subscribe((results) => {
            this.resultsTable = results.data;
            this.resultsTable.sort((a: Appointment, b: Appointment) => {
                let date1 = a.appointmentdatetime;
                let date2 = b.appointmentdatetime;
                let diff = date2.valueOf() - date1.valueOf();
                if (diff > 0) {
                    return 1;
                } else if (diff < 0) {
                    return -1;
                }
                return 0;
            });
        });
    }
}
