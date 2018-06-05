import { TestBed, async, inject, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MockBackend } from '@angular/http/testing';
import { RouterModule, Router, Routes } from '@angular/router';
import {
  HttpModule,
  BaseRequestOptions,
  Response,
  ResponseOptions,
  Http
} from '@angular/http';
import { BrowserDynamicTestingModule,
  platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { AppState } from '../app.service';
import { HomeComponent } from './home.component';

describe(`Home`, () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let router: Router;
  let location: Location;
  /**
   * async beforeEach.
   */
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpModule
      ],
      declarations: [HomeComponent],
      schemas: [NO_ERRORS_SCHEMA],
      providers: [
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        },
        AppState,
      ]
    })
    /**
     * Compile template and css.
     */
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;

    /**
     * Trigger initial data binding.
     */
    router = TestBed.get(Router);
    fixture.detectChanges();
    router.initialNavigation();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test for the home routing to login page ', () => {
    let spy = spyOn(router, 'navigateByUrl');
    component.patientOnClick();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/login');
  });

  it('should test for the on home console output', () => {
    let spy = spyOn(console, 'log');
    component.patientOnClick();
    expect(console.log).toHaveBeenCalled();
  });
});
