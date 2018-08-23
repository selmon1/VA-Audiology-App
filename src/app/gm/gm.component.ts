import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../app.service';

@Component({
  selector: 'app-gm',
  templateUrl: './gm.component.html',
  styleUrls: ['./gm.component.css']
})
export class GmComponent implements OnInit {

    public localState = { value: '' };
    constructor(public appState: AppState, private router: Router) { }

  ngOnInit() {
  }

  public patientOnClick() {
      this.router.navigateByUrl('/landing');
      console.log('go to landing page');
  }
}
