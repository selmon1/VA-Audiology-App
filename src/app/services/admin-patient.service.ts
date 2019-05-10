import { Injectable } from '@angular/core';
import { ServerApiService } from './server-api.service';

@Injectable()
export class AdminPatientService {
  constructor(private serverApiService: ServerApiService) { }

  public dummy_heartbeat() : void {
    this.serverApiService.get('/')
      .subscribe(response => console.log(response));
  }
}

