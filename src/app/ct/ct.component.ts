import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../app.service';


@Component({
  selector: 'app-ct',
  templateUrl: './ct.component.html',
  styleUrls: ['./ct.component.css']
})
export class CtComponent implements OnInit {
    public localState = { value: '' };
    constructor(public appState: AppState, private router: Router) { }

  ngOnInit() {
  }

  public patientOnClick() {
      this.router.navigateByUrl('/landing');
      console.log('go to landing page');
  }
}
