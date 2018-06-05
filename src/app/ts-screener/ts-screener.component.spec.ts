import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { ThsComponent } from './ths.component';
import { TsScreenerComponent } from './ts-screener.component';
import { TsScreenerStateflowService } from '../services/ts-screener-stateflow.service';
import { TsScreenerDataService } from '../services/ts-screener-data.service';
import { Utilities } from '../common/utlilities';

describe('TsScreenerComponent', () => {
  let component: TsScreenerComponent;
  let service: TsScreenerStateflowService;
  let fixture: ComponentFixture<TsScreenerComponent>;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      providers: [
        TsScreenerStateflowService,
        TsScreenerDataService
      ],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        TsScreenerComponent
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TsScreenerComponent);
    component = fixture.debugElement.componentInstance;

    fixture.detectChanges();

    service = TestBed.get(TsScreenerStateflowService);
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

    it('should route to ths', () => {
      let spy = spyOn(service, 'moveStateForward').and.returnValue(7);
      let navSpy = spyOn(component.router, 'navigateByUrl');
      Utilities.setSessionStorage('nextComponent', 'false');
      component.moveStateForward('hello');
      expect(navSpy).toHaveBeenCalledWith('/ths');
    });
  });
});
