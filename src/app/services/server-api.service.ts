import { Injectable, ErrorHandler } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Response } from '../../../api-objects/GenericResponse';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import { Utilities } from '../common/utlilities';
import { ErrorHandlingService } from './error-handling.service';

@Injectable()
export class ServerApiService {
  // TODO: Configure base Url, to point to hosted endpoint. (localhost:3333 isn't a valid endpoint.)

  private baseUrl = 'REPLACE ME';  // URL to web api

  constructor(private http: HttpClient, private errorHandler: ErrorHandlingService) { }

  // Base Function
  public get<T>(urlExtension: string, queryParams?: Map<string, string>): Observable<Response<T>> {
    return this.http.get<Response<T>>(this.baseUrl + urlExtension, this.createHeaders(queryParams)).pipe(
      catchError(this.errorHandler.handleServerError<Response<T>>())
      );
  }

  public post<T>(urlExtension: string, body: any, queryParams?: Map<string, string>): Observable<Response<T>> {
    return this.http.post<Response<T>>(this.baseUrl + urlExtension, body, this.createHeaders(queryParams)).pipe(
      catchError(this.errorHandler.handleServerError<Response<T>>())
    );
  }

  public delete<T>(urlExtension: string, queryParams?: Map<string, string>): Observable<Response<T>> {
    return this.http.delete<Response<T>>(this.baseUrl + urlExtension, this.createHeaders(queryParams)).pipe(
      catchError(this.errorHandler.handleServerError<Response<T>>())
    );
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
