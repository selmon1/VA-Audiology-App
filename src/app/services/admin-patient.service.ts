import { Injectable } from '@angular/core';
import { ServerApiService } from './server-api.service';

@Injectable()
export class AdminPatientService {
    constructor(private serverApiService: ServerApiService) { }
}

