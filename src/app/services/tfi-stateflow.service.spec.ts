import { TestBed, inject } from '@angular/core/testing';

import { TfiStateflowService } from './tfi-stateflow.service';

describe('TfiStateflowService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TfiStateflowService]
    });
  });

  it('should be created', inject([TfiStateflowService], (service: TfiStateflowService) => {
    expect(service).toBeTruthy();
  }));
});
