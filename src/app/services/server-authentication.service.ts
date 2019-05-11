import { Injectable } from '@angular/core';
import { ServerApiService } from './server-api.service';
import { Observable } from 'rxjs';
import { Response } from '../../../api-objects/GenericResponse'
import { LoginSession } from 'api-objects/LoginSession';
import { tap } from 'rxjs/operators';
import { Utilities } from '../common/utlilities';
import { map } from 'rxjs/operators';

@Injectable()
export class ServerAuthenticationService {
    //constructor(private serverApiService: ServerApiService) { }
    constructor(private serverApiService: ServerApiService) { }

    public login(username: string, password: string): Observable<null> {
        return this.serverApiService.post<LoginSession>('login', { 'username': username, 'password': password })
            .pipe(
                tap((response) => {
                    Utilities.setSessionStorage('userId', response.data.user.toString());
                    Utilities.setSessionStorage('sessionId', response.data.session.toString());
                    // Making Permission Check
                    if (response.data.authorityType > 0) {
                        Utilities.setSessionStorage('permissions', 'admin');
                    } else {
                        Utilities.setSessionStorage('permissions', 'audiologist');
                    }
                }),
                map<Response<LoginSession>, null>(_ => null)
            );
    }

    public heartbeat(): Observable<Response<string>> {
        return this.serverApiService.get('heartbeat');
    }
}
