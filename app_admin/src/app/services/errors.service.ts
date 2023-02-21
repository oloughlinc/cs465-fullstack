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

    var errMessage: string = '';

    // 0 = no response
    if (error.status === 0) {
      errMessage = 'A client-side or network error has occurred.';
      console.error(error.message);

    // 401 = unauthorized
    } else if (error.status === 401) {
      errMessage = 'Invalid Credentials';

    // all else
    } else {
      errMessage = `Backend returned code ${error.status}, body was: ` + error.message;
      console.error(
        `Backend returned code ${error.status}, body was: `, error.message);
    }
    // Either way, return an error object
    return throwError(() => new Error(errMessage));
  }
}
