import { Injectable } from '@angular/core';
import { ServerApiService } from './server-api.service';
import { Observable } from 'rxjs';
import { Response } from '../../../api-objects/GenericResponse';
import { AdminPatientResponse, ResetPasswordResponse, UserListItem } from '../../../api-objects/AdminPatient';
import { PatientResponse } from '../../../api-objects/patientResponse';

@Injectable()
export class AdminPatientService {
  constructor(private serverApiService: ServerApiService) { }

  public getPatients() : Observable<Response<PatientResponse[]>> {
    return this.serverApiService.get<PatientResponse[]>('patient');
  }

  public getPatient(patientId : number) : Observable<Response<PatientResponse[]>> {
    return this.serverApiService.get<PatientResponse[]>('patient/' + patientId);
  }

  public deletePatient(patientId : number) : Observable<Response<any>> {
    return this.serverApiService.delete<any>('patient/' + patientId);
  }

  public updateNotes(patientId : number, notes : string) : Observable<Response<any>> {
    return this.serverApiService.post<any>('patient/' + patientId + '/notes', {notes});
  }
}

