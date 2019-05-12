import { Injectable } from '@angular/core';
import { ServerApiService } from './server-api.service';

export class CreateUserResponse {
  public message: string;
}

export class RenameUserResponse {
  public message: string;
}

export class ResetPasswordResponse {
  public password: string;
}

export class DeleteUserResponse {
  public message: string;
}

export class UserListItem {
  public name: string;
  public type: string;
}

export class UserList {
  public data: UserListItem[];
}

@Injectable()
export class AdminPatientService {
  constructor(private serverApiService: ServerApiService) { }

  public createUser(name: string, password: string, type: string) {
    this.serverApiService.post<CreateUserResponse>('/user/create', {'name': name, 'password': password, 'type': type})
      .subscribe((response) => console.log(response));
  }

  public renameUser(currName: string, nextName: string) {
    this.serverApiService.post<RenameUserResponse>('/user/rename', {'oldName': currName, 'newName': nextName})
      .subscribe(response => console.log(response));
  }

  public resetPassword(name: string) {
    this.serverApiService.post<ResetPasswordResponse>('/user/resetPassword', { 'name': name })
      .subscribe(response => console.log(response));
  }

  public deleteUser(name: string) {
    let params : Map<string, string> = new Map();

    params.set('name', name);

    this.serverApiService.delete<DeleteUserResponse>('/user/delete', params)
      .subscribe(response => console.log(response));
  }

  public listUsers() {
    this.serverApiService.get<UserListItem[]>('/user/list')
      .subscribe(response => console.log(response.data));
  }
}

