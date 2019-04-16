import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class AppointmentsService {

  private appointmentUrl = 'localhost:3333';  // URL to web api

  constructor(
    private http: HttpClient) { }

  public getHeroes(): Observable<Array<object>> {
      return this.http.get<Array<object>>(this.appointmentUrl)
        .pipe(
          tap(_ => console.log('fetched heroes')),
          // TODO: write error handling
          // catchError(this.handleError<Hero[]>('getHeroes', [])) 
        );
    }

  public getAppointment(appointmentId){
    return this.http.get<any>(this.appointmentUrl+'?appointmentID='+appointmentId)
      .pipe(
        tap(_ => console.log('fetched heroes')),
        //catchError(this.handleError('getHeroes', []))
      );
  }
}
