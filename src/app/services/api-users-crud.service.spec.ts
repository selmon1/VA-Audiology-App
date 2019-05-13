import { TestBed, inject } from '@angular/core/testing';

import { ApiUsersCrudService } from './api-users-crud.service';

describe('ApiUsersCrudService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ApiUsersCrudService]
    });
  });

  it('should be created', inject([ApiUsersCrudService], (service: ApiUsersCrudService) => {
    expect(service).toBeTruthy();
  }));
});
