import { AudiologistNavigationComponent } from '../audiologist-navigation/audiologist-navigation.component';
import { CheckInComponent } from './check-in.component';
import { TestBed, async, ComponentFixture, tick, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA, NgModule } from '@angular/core';
import { RouterModule, Router, Routes } from '@angular/router';
import { AppointmentsComponent } from '../appointments/appointments.component';
import { TsScreenerDataService } from '../services/ts-screener-data.service';
import { TfiDataService } from '../services/tfi-data.service';
import { ThsDataService } from '../services/ths-data.service';

describe('Initial Assessment', () => {
  let component: CheckInComponent;
  let fixture: ComponentFixture<CheckInComponent>;
  let router: Router;
  let location: Location;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule
        ],
        providers: [
          TsScreenerDataService,
          TfiDataService,
          ThsDataService
        ],
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [
          CheckInComponent,
          AppointmentsComponent,
          AudiologistNavigationComponent
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(CheckInComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
    router.initialNavigation();
  });

  it('click should navigate to appointments', fakeAsync(() => {
    let spy = spyOn(router, 'navigateByUrl');
    component.patientId = '6666';
    component.onClick();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/appointments');
  }));

  it('click should navigate to audio-nav', fakeAsync(() => {
    let spy = spyOn(router, 'navigateByUrl');
    component.patientId = '123456';
    component.onClick();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/audiologist');
  }));

  it('click should not route with incorrect passcode', fakeAsync(() => {
    let spy = spyOn(console, 'log');
    component.patientId = '55555';
    component.onClick();
    expect(console.log).toHaveBeenCalled();
  }));

  it('keydown should submit with enter key', fakeAsync(() => {
    let spy = spyOn(component, 'onClick');
    component.keyDownFunction({keyCode: 13});
    expect(component.onClick).toHaveBeenCalled();
  }));

  it('keydown should not submit with any key besides the enter key', fakeAsync(() => {
    let spy = spyOn(component, 'onClick');
    component.keyDownFunction({keyCode: 12});
    expect(component.authenticationFlag).toBe(true);
  }));

});
