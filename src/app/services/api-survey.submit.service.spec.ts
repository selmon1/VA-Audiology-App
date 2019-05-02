import { TestBed, inject } from '@angular/core/testing';
import { SurveySubmitHandler } from './api-survey.submit.service.ts';

describe('SurveySubmitHandler', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SurveySubmitHandler]
    });
  });

  it('should be created', inject([SurveySubmitHandler], (service: SurveySubmitHandler) => {
    expect(service).toBeTruthy();
  }));

  it('should print name', inject([SurveySubmitHandler], (service: SurveySubmitHandler) => {
    expect(service.print()).toBe('Test');
  }));
});
