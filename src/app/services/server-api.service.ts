import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Response } from '../../../api-objects/GenericResponse';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class ServerApiService {
  // TODO: Configure base Url, to point to hosted endpoint. (localhost:3333 isn't a valid endpoint.)

  private baseUrl = 'REPLACE ME';  // URL to web api

  constructor(private http: HttpClient) { }
  
  // Base Function
  public get<T>(urlExtension: string, queryParams?: Map<string, string>): Observable<Response<T>> {
    return this.http.get<Response<T>>(this.baseUrl + urlExtension, this.createHeaders(queryParams));
  }

  public post<T>(urlExtension: string, body: any, queryParams?: Map<string, string>): Observable<Response<T>> {
    return this.http.post<Response<T>>(this.baseUrl + urlExtension, body, this.createHeaders(queryParams));
  }

  public delete<T>(urlExtension: string, queryParams?: Map<string, string>): Observable<Response<T>> {
    return this.http.delete<Response<T>>(this.baseUrl + urlExtension, this.createHeaders(queryParams));
  }

  private createHeaders(queryParams?: Map<string, string>) {
    let parameters = new HttpParams();
    if (queryParams) {
      queryParams.forEach((value, key , map) => {
        parameters = parameters.set(key, value);
      });
    }
    return {
      params: parameters,
      headers: new HttpHeaders({
        'Accept': 'application/json',
        'X-USER-ID': this.getAuthorization(),
        'X-SESSION-ID': this.getSessionId()
      })
    };
  }

  // TODO: Add appropriate authorization that should be collected when a Audiologist or Admin Logs in.
  // TODO: We will pull this into sepperate https interceptor at a future point.
  private getAuthorization(): string {
    return '15';
  }

  private getSessionId(): string {
    return '15';
  }

}