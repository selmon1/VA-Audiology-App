import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { TfiDataService } from '../../services/tfi-data.service';
import { TfiQuestionComponent } from './tfi-question.component';

describe('TfiQuestionComponent', () => {
  let component: TfiQuestionComponent;
  let service: TfiDataService;
  let fixture: ComponentFixture<TfiQuestionComponent>;

  beforeEach(async() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [TfiDataService],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [TfiQuestionComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TfiQuestionComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    service = TestBed.get(TfiDataService);
  });

  describe('On creation', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });
  });
});
