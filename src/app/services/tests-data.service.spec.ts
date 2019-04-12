import { TestBed, inject } from '@angular/core/testing';

import { TestsDataService } from './tests-data.service';

describe('TestsDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TestsDataService]
    });
  });

  it('should be created', inject([TestsDataService], (service: TestsDataService) => {
    expect(service).toBeTruthy();
  }));
});
