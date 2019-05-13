import { TestBed, inject } from '@angular/core/testing';

import { ServerAuthenticationService } from './server-authentication.service';

describe('ServerAuthenticationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ServerAuthenticationService]
    });
  });

  it('should be created', inject([ServerAuthenticationService], (service: ServerAuthenticationService) => {
    expect(service).toBeTruthy();
  }));
});
