import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Response } from '../../../api-objects/GenericResponse';
import { catchError, map, tap } from 'rxjs/operators';
import { Utilities } from '../common/utlilities';
import { LoginSession } from '../../../api-objects/LoginSession';
import { authorityTypes } from '../../../api-objects/UsersObject';
import baseUrl from '../common/base-url';

@Injectable()
export class ReloginPopupService {

    constructor(private http: HttpClient) { }

    // Using the server-authentication service causes a circular dependancy problem,
    // To solve, it along with some code from server-api service had to be duplicated here.
    public login(username: string, password: string): Observable<null> {
        return this.post<LoginSession>('login', { 'username': username, 'password': password })
            .pipe(
                tap((response) => {

                    Utilities.setSessionStorage('userId', response.data.user.toString());
                    Utilities.setSessionStorage('sessionId', response.data.session.toString());
                    console.log(authorityTypes[response.data.authorityType]);
                    Utilities.setSessionStorage('permissions', authorityTypes[response.data.authorityType]);
                }),
                map<Response<LoginSession>, null>(_ => null)
            );
    }

    private post<T>(urlExtension: string, body: any, queryParams?: Map<string, string>): Observable<Response<T>> {
        return this.http.post<Response<T>>(baseUrl + urlExtension, body, this.createHeaders(queryParams));
    }

    private createHeaders(queryParams?: Map<string, string>) {
        let parameters = new HttpParams();
        if (queryParams) {
            queryParams.forEach((value, key, map) => {
                parameters = parameters.set(key, value);
            });
        }
        return {
            params: parameters,
            headers: new HttpHeaders({
                'Accept': 'application/json',
                'X-USER-ID': this.getAuth('userId'),
                'X-SESSION-ID': this.getAuth('sessionId')
            })
        };
    }

    private getAuth(input: string): string {
        let value = Utilities.getSessionStorage(input);
        return (value === null) ? ' ' : value;
    }
}
