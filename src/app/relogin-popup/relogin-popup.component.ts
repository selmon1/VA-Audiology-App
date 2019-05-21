import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Router } from '@angular/router';
import { Utilities } from '../common/utlilities';
import { ReloginPopupService } from './relogin-popup.service';

export interface ReloginData {
  username: string;
  password: string;
}

@Component({
  selector: 'app-relogin-popup',
  templateUrl: './relogin-popup.component.html',
  styleUrls: ['./relogin-popup.component.css']
})
export class ReloginPopupComponent implements OnInit {
  private loginFail: boolean = false;
  private data: ReloginData = {username: '', password: ''};

  constructor(
    private diaglogRef: MatDialogRef<ReloginPopupComponent>,
    private router: Router,
    private service: ReloginPopupService
    ) { }

  ngOnInit() {
  }

  private onLogout(): void {
    // clear all patient data in memory
    let sessionKeys: string[] = [
      'patient-id',
      'tests-data',
      'tfi-dataRecord',
      'ths-dataRecord',
      'ths-history',
      'ts-dataRecord',
      'ts-history',
      'appt',
      'last-name',
      'ts-currentState',
      'ths-currentState',
      'email',
      'first-name',
      'tfi-currentState'
    ];
    sessionKeys.forEach((value) => {
      Utilities.removeItemFromSessionStorage(value);
    });
    this.router.navigateByUrl('/home');
    this.diaglogRef.close();
  }

  private onLogin(): void {
    this.service.login(this.data.username, this.data.password).subscribe((response) => {
      this.loginFail = false;
      this.diaglogRef.close();
    },
      error => {
        this.loginFail = true;
        this.data.password = '';
        this.data.username = '';
      });
  }

}
