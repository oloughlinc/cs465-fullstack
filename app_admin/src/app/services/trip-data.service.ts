import { Injectable } from '@angular/core';

// NOTE!!!
// i had no luck even getting the starter page up with
// the very outdate angular v6 so am using the latest version

// using code from here instead
// https://angular.io/guide/http

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Trip } from '../models/trip';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(private http: HttpClient) { }

  private apiBaseUrl = 'http://localhost:3000/api/';

  public getTrips(): Observable<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http
      .get<Trip[]>(`${this.apiBaseUrl}trips`, {observe: 'body', responseType: 'json'})
      .pipe(
        catchError(this.handleError)
      );
 }

  private handleError(error: HttpErrorResponse) {
    
    // we fed this function into the pipeline for the observable 'blueprint' getTrips
    // that will be called on error
    // https://angular.io/guide/http#error-handling

    // check the error status code
    if (error.status === 0) {
      console.error('A client-side or network error has occurred:', error.error);
    } else {
      // got a response other than 200 or nothing/0
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Either way, return an error object
    return throwError(() => new Error('Something bad happened, please try again later.'));
  }
}
