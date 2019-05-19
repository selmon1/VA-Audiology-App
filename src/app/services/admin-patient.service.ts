import { Injectable } from '@angular/core';
import { ServerApiService } from './server-api.service';
import { Observable } from 'rxjs';
import { Response } from '../../../api-objects/GenericResponse';
import { PatientResponse } from '../../../api-objects/patientResponse';
import { Appointment } from '../../../api-objects/Appointment';
import { CreatePatientData } from '../../../api-objects/AdminPatient';

@Injectable()
export class AdminPatientService {
  constructor(private serverApiService: ServerApiService) { }

  public createPatient(patientData : CreatePatientData) : Observable<Response<PatientResponse>> {
    return this.serverApiService.post('patient', {'patientId' : patientData.patientId,
                                                  'deceased' : patientData.deceased,
                                                  'patientNotes' :patientData.patientNotes});
  }

  public getPatients() : Observable<Response<PatientResponse[]>> {
    return this.serverApiService.get<PatientResponse[]>('patient');
  }

  public getPatient(patientId : number) : Observable<Response<PatientResponse[]>> {
    return this.serverApiService.get<PatientResponse[]>('patient/' + patientId);
  }

  public getPatientAppointments(patientId: string): Observable<Response<Appointment[]>> {
    return this.serverApiService.get<Appointment[]>('appointments', new Map([['id', patientId]]));
  }

  public deletePatient(patientId : number) : Observable<Response<any>> {
    return this.serverApiService.delete<any>('patient/' + patientId);
  }

  public updateNotes(patientId : number, notes : string) : Observable<Response<any>> {
    return this.serverApiService.post<any>('patient/' + patientId + '/notes', {notes});
  }
}

