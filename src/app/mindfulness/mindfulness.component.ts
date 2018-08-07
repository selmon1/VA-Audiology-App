import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-mindfulness',
  templateUrl: './mindfulness.component.html',
  styleUrls: ['./mindfulness.component.css']
})
export class MindfulnessComponent implements OnInit {

    constructor(private router: Router) { }

  ngOnInit() {
  }

}
