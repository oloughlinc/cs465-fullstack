import { Inject, Injectable } from '@angular/core';

// i had no luck even getting the starter page up with
// the very outdate angular v6 so am using the latest version
// the old http client has dissapeard
// using code from here instead
// https://angular.io/guide/http

import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Trip } from '../models/trip';
import { BROWSER_STORAGE } from '../models/storage';
import { ErrorsService } from './errors.service';

@Injectable({
  providedIn: 'root'
})
export class TripDataService {

  constructor(
    private http: HttpClient,
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private errors: ErrorsService,
    ) { }

  private apiBaseUrl = 'http://localhost:3000/api/';
  private tripsURL = `${this.apiBaseUrl}trips`;

  // API CALL: GET TRIPS
  public getTrips(): Observable<Trip[]> {
    console.log('Inside TripDataService#getTrips');
    return this.http
      .get<Trip[]>(this.tripsURL, {observe: 'body', responseType: 'json'})
      .pipe(
        catchError(this.errors.handleError)
      );
 }

 // API CALL: GET TRIP (single)
 public getTripByCode(tripCode: string): Observable<Trip> {
  console.log(`Inside TripDataService#getTripByCode(${tripCode})`);
  return this.http
    .get<Trip>(`${this.tripsURL}/code/${tripCode}`, {observe: 'body', responseType: 'json'})
    .pipe(
      catchError(this.errors.handleError)
    );
}

 // API CALL: POST NEW TRIP
  public addTrip(formData: Trip): Observable<Trip> {
    console.log('Inside TripDataService#addTrip');
    return this.http
      .post<Trip>(this.tripsURL, formData)
      .pipe(
        catchError(this.errors.handleError)
      );
  }

  // API CALL: UPDATE TRIP
  public updateTrip(formData: Trip) : Observable<Trip> {
    console.log('Inside TripDataService#updateTrip');
    console.log(formData);
    return this.http
      .put<Trip>(`${this.tripsURL}/code/${formData.code}`, formData)
      .pipe(
        catchError(this.errors.handleError)
      )
  }

}
