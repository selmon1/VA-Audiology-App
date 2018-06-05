import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ThsComponent } from './ths.component';
import { ThsStateflowService } from '../services/ths-stateflow.service';
import { ThsDataService } from '../services/ths-data.service';
import { Utilities } from '../common/utlilities';

describe('ThsComponent', () => {
  let component: ThsComponent;
  let service: ThsStateflowService;
  let fixture: ComponentFixture<ThsComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
        imports: [
          RouterTestingModule,
        ],
        providers: [
          ThsStateflowService,
          ThsDataService
        ],
        schemas: [NO_ERRORS_SCHEMA],
        declarations: [
          ThsComponent
        ],
    }).compileComponents();

    fixture = TestBed.createComponent(ThsComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();

    service = TestBed.get(ThsStateflowService);
  });

  describe('moveStateBackward', () => {
    it('should not set currentState', () => {
        let spy = spyOn(service, 'moveStateBackward').and.returnValue(null);
        component.moveStateBackward();
        expect(component.currentState).toEqual(1);
    });

    it('should set currentState', () => {
        let spy = spyOn(service, 'moveStateBackward').and.returnValue(5);
        component.moveStateBackward();
        expect(component.currentState).toEqual(5);
    });
  });

  describe('moveStateForward', () => {
    it('should not set currentState', () => {
        component.currentState = 1;
        component.moveStateForward(null);
        expect(component.currentState).toEqual(1);
    });

    it('should set currentState', () => {
        let spy = spyOn(service, 'moveStateForward').and.returnValue(5);
        component.moveStateForward('hello');
        expect(component.currentState).toEqual(5);
    });

    it('should route to tfi', () => {
        let spy = spyOn(service, 'moveStateForward').and.returnValue(11);
        let navSpy = spyOn(component.router, 'navigateByUrl');
        Utilities.setSessionStorage('nextComponent', 'false');
        component.moveStateForward('hello');
        expect(navSpy).toHaveBeenCalledWith('/tfi');
    });

    it('should route to thank you', () => {
        let spy = spyOn(service, 'moveStateForward').and.returnValue(11);
        let navSpy = spyOn(component.router, 'navigateByUrl');
        Utilities.setSessionStorage('nextComponent', 'true');
        component.moveStateForward('hello');
        expect(navSpy).toHaveBeenCalledWith('/thank-you');
    });
  });
});
