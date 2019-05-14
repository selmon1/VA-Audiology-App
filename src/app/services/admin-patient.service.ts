import { Injectable } from '@angular/core';
import { ServerApiService } from './server-api.service';
import { Observable } from 'rxjs';
import { Response } from '../../../api-objects/GenericResponse';
import { AdminPatientResponse, ResetPasswordResponse, UserListItem } from '../../../api-objects/AdminPatient';

@Injectable()
export class AdminPatientService {
  constructor(private serverApiService: ServerApiService) { }

  public createUser(name: string, password: string, type: string) : Observable<Response<AdminPatientResponse>> {
    return this.serverApiService.post<AdminPatientResponse>('/accounts/create', {'name': name, 'password': password, 'type': type});
  }

  public renameUser(currName: string, nextName: string) : Observable<Response<AdminPatientResponse>> {
    return this.serverApiService.post<AdminPatientResponse>('/accounts/rename', {'oldName': currName, 'newName': nextName});
  }

  public resetPassword(name: string) : Observable<Response<ResetPasswordResponse>> {
    return this.serverApiService.post<ResetPasswordResponse>('/accounts/resetPassword', { 'name': name });
  }

  public deleteUser(name: string) : Observable<Response<AdminPatientResponse>> {
    let params : Map<string, string> = new Map();

    params.set('name', name);

    return this.serverApiService.delete<AdminPatientResponse>('/accounts/delete', params);
  }

  public listUsers() : Observable<Response<UserListItem[]>> {
    return this.serverApiService.get<UserListItem[]>('/accounts/list');
  }
}

