import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../app.service';


@Component({
  selector: 'app-mindfulness',
  templateUrl: './mindfulness.component.html',
  styleUrls: ['./mindfulness.component.css']
})
export class MindfulnessComponent implements OnInit {
    public localState = { value: '' };
    constructor(public appState: AppState, private router: Router) { }

  ngOnInit() {
  }

  public patientOnClick() {
      this.router.navigateByUrl('/landing');
      console.log('go to landing page');
  }
}
