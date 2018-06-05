import { Component, OnInit } from '@angular/core';
import { Utilities } from '../common/utlilities';

/*
Audiogram Test Component for the audiologist view:
Displays all the labels, radio buttons and checkboxes.
This component does not save information to any data services/databases
*/
@Component({
  selector: 'audiogram',
  templateUrl: './audiogram.component.html',
  styleUrls: ['./audiogram.component.css']
})

export class AudiogramComponent implements OnInit {

  public patientID: string = Utilities.getSessionStorage('patient-id');

  // Text for test type radio buttons in the template
  public testTypes = [
    'Conductive',
    'Sensorineural',
    'Mixed'
  ];

  // Text for Serverity radio buttons in the template
  public severities = [
    'Normal',
    'Moderate',
    'Moderate/Severe',
    'Severe',
    'Profound'
  ];

  // Text for configurations checkboxes in the template
  public configurations = [
    'Symmetric',
    'Asymmetric',
    'Progressive',
    'Sudden',
    'Flat',
    'Rising',
    'Cookie Bite',
    'Precipitous',
    'Noise-Notch',
    'Corner'
  ];

  public ngOnInit() { }

}
