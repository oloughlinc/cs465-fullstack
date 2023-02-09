import { Injectable } from '@angular/core';

// i had no luck even getting the starter page up with
// the very outdate angular v6 so am using the latest version
// the old http client has dissapeard
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
  private tripsURL = `${this.apiBaseUrl}trips`;

  // API CALL: GET TRIPS
  public getTrips(): Observable<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http
      .get<Trip[]>(this.tripsURL, {observe: 'body', responseType: 'json'})
      .pipe(
        catchError(this.handleError)
      );
 }

 // API CALL: GET TRIP (single)
 public getTripByCode(tripCode: string): Observable<Trip> {
  console.log(`Inside TripDataService#getTripByCode(${tripCode})`);
  return this.http
    .get<Trip>(`${this.tripsURL}/code/${tripCode}`, {observe: 'body', responseType: 'json'})
    .pipe(
      catchError(this.handleError)
    );
}

 // API CALL: POST NEW TRIP
  public addTrip(formData: Trip): Observable<Trip> {
    console.log('Inside TripDataService#addTrip');
    return this.http
      .post<Trip>(this.tripsURL, formData)
      .pipe(
        catchError(this.handleError)
      );
  }

  // API CALL: UPDATE TRIP
  public updateTrip(formData: Trip) : Observable<Trip> {
    console.log('Inside TripDataService#updateTrip');
    console.log(formData);
    return this.http
      .put<Trip>(`${this.tripsURL}/code/${formData.code}`, formData)
      .pipe(
        catchError(this.handleError)
      )
  }

  private handleError(error: HttpErrorResponse) {
    
    // we fed this function into the pipeline for the observable 'blueprints' above
    // that will be called on error
    // https://angular.io/guide/http#error-handling

    // no response
    if (error.status === 0) {
      console.error('A client-side or network error has occurred:', error.error);
    } else {
      // got a response other than 200
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    // Either way, return an error object
    return throwError(() => new Error('Something bad happened, please try again later.'));
  }
}
