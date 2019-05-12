import { Injectable } from '@angular/core';
import { ServerApiService } from './server-api.service';

export class CreateUserResponse {
	public message: string;
}

@Injectable()
export class AdminPatientService {
  constructor(private serverApiService: ServerApiService) { }

  public dummy_heartbeat() : void {
    this.serverApiService.get('/')
      .subscribe(response => console.log(response));
  }

  public createUser(name: string, password: string, type: string) {
    this.serverApiService.post<CreateUserResponse>('/user/create', {'name': name, 'password': password, 'type': type})
      .subscribe((response) => console.log(response));
  }

  public renameUser(currName: string, nextName: string) {
    this.serverApiService.post('/user/rename', {'oldName': currName, 'newName': nextName})
      .subscribe(response => console.log(response));
  }

  public resetPassword(name: string) {
    this.serverApiService.post('/user/resetPassword', { 'name': name })
      .subscribe(response => console.log(response));
  }

  public deleteUser(name: string) {
    let params : Map<string, string> = new Map();

    params.set('name', name);

    this.serverApiService.delete('/user/delete', params)
      .subscribe(response => console.log(response));
  }

  public listUsers() {
    this.serverApiService.get('/user/list')
      .subscribe(response => console.log(response));
  }
}

