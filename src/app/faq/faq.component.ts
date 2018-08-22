import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppState } from '../app.service';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css']
})
export class FaqComponent implements OnInit {
    public localState = { value: '' };
    constructor(public appState: AppState, private router: Router) { }

  ngOnInit() {
  }

  public patientOnClick() {
      this.router.navigateByUrl('/landing');
      console.log('go to landing page');
  }
}
