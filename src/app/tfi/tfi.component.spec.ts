import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { TfiDataService } from '../services/tfi-data.service';
import { TfiComponent } from './tfi.component';

describe('TfiComponent', () => {
  let component: TfiComponent;
  let service: TfiDataService;
  let fixture: ComponentFixture<TfiComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [TfiDataService],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TfiComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TfiComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(TfiDataService);
  });

  describe('moveStateForward', () => {
    it('should not increment state', () => {
      let spy = spyOn(service, 'saveData');
      component.moveStateForward(null);
      expect(component.currentState).toEqual(0);
    });

    it('should increment state', () => {
      let spy = spyOn(service, 'saveData');
      component.currentState = 12;
      component.moveStateForward('happy');
      expect(component.currentState).toEqual(13);
    });
    it('should route to /thank-you', () => {
      let spy = spyOn(service, 'saveData');
      let navSpy = spyOn(component.router, 'navigateByUrl');
      component.currentState = 24;
      component.moveStateForward('happy');
      expect(navSpy).toHaveBeenCalledWith('/thank-you');
    });
  });

  describe('moveStateBackward', () => {
    it('should not decrement state', () => {
      component.currentState = 0;
      let spy = spyOn(service, 'moveStateBackward');
      component.moveStateBackward();
      expect(component.currentState).toEqual(0);
    });

    it('should decrement state', () => {
      let spy = spyOn(service, 'moveStateBackward');
      component.currentState = 4;
      component.moveStateBackward();
      expect(component.currentState).toEqual(3);
    });
  });

});
