import { Injectable } from '@angular/core';
import { ServerApiService } from './server-api.service';
import { Observable } from 'rxjs';
import { GenericAdminPatientResponse, ResetPasswordResponse, UserListItem } from '../../../api-objects/AdminPatient';

@Injectable()
export class AdminPatientService {
  constructor(private serverApiService: ServerApiService) { }

  public createUser(name: string, password: string, type: string) {
    return this.serverApiService.post<GenericAdminPatientResponse>('/accounts/create', {'name': name, 'password': password, 'type': type});
  }

  public renameUser(currName: string, nextName: string) {
    return this.serverApiService.post<GenericAdminPatientResponse>('/accounts/rename', {'oldName': currName, 'newName': nextName});
  }

  public resetPassword(name: string) {
    return this.serverApiService.post<ResetPasswordResponse>('/accounts/resetPassword', { 'name': name });
  }

  public deleteUser(name: string) {
    let params : Map<string, string> = new Map();

    params.set('name', name);

    return this.serverApiService.delete<GenericAdminPatientResponse>('/accounts/delete', params);
  }

  public listUsers() {
    return this.serverApiService.get<UserListItem[]>('/accounts/list');
  }
}

