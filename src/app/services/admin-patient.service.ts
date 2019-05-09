import { Injectable } from '@angular/core';
import { ServerApiService } from './server-api.service';

@Injectable()
export class AdminPatientHandler {
    constructor(private serverApiService: ServerApiService) { }
}

