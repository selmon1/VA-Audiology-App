import { LogoComponent } from './logo.component';
import { TestBed, async, ComponentFixture, fakeAsync } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

describe('Initial Assessment', () => {
  let component: LogoComponent;
  let fixture: ComponentFixture<LogoComponent>;
  let router: Router;
  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
        ],
        providers: [
        ],
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [
          LogoComponent
        ]
    }).compileComponents();

    fixture = TestBed.createComponent(LogoComponent);
    component = fixture.debugElement.componentInstance;
    router = TestBed.get(Router);
    fixture.detectChanges();
    router.initialNavigation();
  });

  it('should test for logo image route', fakeAsync(() => {
    let spy = spyOn(router, 'navigateByUrl');
    component.logoRouteOption = '1';
    component.onClick();
    expect(router.navigateByUrl).toHaveBeenCalledWith('/home');

  }));

  it('should test for logo image console log', fakeAsync(() => {
    let spy = spyOn(console, 'log');
    component.logoRouteOption = '2';
    component.onClick();
    expect(console.log).toHaveBeenCalled();
  }));

});
