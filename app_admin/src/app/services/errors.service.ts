import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService {

  constructor() { }

  public handleError(error: HttpErrorResponse) {
    
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
