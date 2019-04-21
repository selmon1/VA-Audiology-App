import { Component, OnInit } from '@angular/core';
import { TestsDataService } from '../services/tests-data.service';
import { TfiDataService } from '../services/tfi-data.service';
import { ThsDataService } from '../services/ths-data.service';
import { TsScreenerDataService } from '../services/ts-screener-data.service';
import { CustomerSearchService } from './customer-search.service';
import { Appointment } from '../../../api-objects/Appointment';

@Component({
    selector: 'customer-search',
    templateUrl: './customer-search.component.html',
    styleUrls: ['./customer-search.component.css']
})
export class CustomerSearchComponent implements OnInit {
    public idSearch: string;
    public searchBtn: boolean = true; // Search button is disabled while querying DB
    public invalidID: boolean = false;
    public resultsTable: Appointment[] = [];

    public currentPage: number = 0;


    constructor(
        private testDataService: TestsDataService, private tsDataService: TsScreenerDataService, private thsDataService: ThsDataService, private tfiDataService: TfiDataService, private customerSearchService: CustomerSearchService) { }

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
    // CHANGE this function to actually load the selected appointment into sessionStorage and tell
    // audiologist-navigation to change state
    public loadAppt(appt: Appointment) {
        if (appt['id'] === '') { return; }
        // for each dataService saveData
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
