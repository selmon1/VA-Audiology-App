import { Injectable } from '@angular/core';
import { ServerApiService } from './server-api.service';
import { Observable } from 'rxjs';
import { Response } from '../../../api-objects/GenericResponse'
import { LoginSession } from 'api-objects/LoginSession';


@Injectable()
export class ServerAuthenticationService {
    //constructor(private serverApiService: ServerApiService) { }
    constructor(private serverApiService: ServerApiService) { }

    public login(username: string, password: string): Observable<Response<LoginSession>> {
        return this.serverApiService.post<LoginSession>('login', { 'username': username, 'password': password })
        //TODO: Find technique of piping authentication into session storrage  
            // .pipe(tap((response) => {
            //     Utilities.setSessionStorage('X-USER-ID', response.data.user)
            //     Utilities.setSessionStorage('X-Session-ID', response.data.session)
            //     console.log('returned ids: ' + response.data.user + response.data.session);
            // }));
    }

    public heartbeat(): Observable<Response<string>> {
        return this.serverApiService.get('heartbeat');
    }
}
