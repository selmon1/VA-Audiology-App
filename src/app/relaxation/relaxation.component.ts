import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../app.service';

@Component({
  selector: 'app-relaxation',
  templateUrl: './relaxation.component.html',
  styleUrls: ['./relaxation.component.css']
})
export class RelaxationComponent implements OnInit {
    public localState = { value: '' };
    constructor(public appState: AppState, private router: Router) { }

  ngOnInit() {
  }

  public patientOnClick() {
      this.router.navigateByUrl('/landing');
      console.log('go to landing page');
  }
}
