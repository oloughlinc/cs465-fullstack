import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { BROWSER_STORAGE } from '../models/storage';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';
import { ErrorsService } from './errors.service';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private apiBaseUrl = 'http://localhost:3000/api/';

  constructor(
    @Inject(BROWSER_STORAGE) private storage: Storage,
    private http: HttpClient,
    private errors: ErrorsService,
  ) { }

  public getToken(): string | null {
    return this.storage.getItem('travlr-token');
  }

  public saveToken(token: string) : void {
    this.storage.setItem('travlr-token', token);
  }

  public login(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('login', user);
  }

  public register(user: User): Observable<AuthResponse> {
    return this.makeAuthApiCall('register', user);
  }

  public logout(): void {
    this.storage.removeItem('travlr-token');
  }

  public isLoggedIn(): boolean {
    const token: string | null = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.exp > (Date.now() / 1000);
    } else {
    return false;
    }
  }

  public getCurrentUser(): User {
    if (this.isLoggedIn()) {
      const token: string = this.getToken() ?? '';
      const { email, name } = JSON.parse(atob(token.split('.')[1]));
      return { email, name } as User;
    } else {
      return new User();
    }
  }

  // API CALL: POST (register/login)
  private makeAuthApiCall(urlPath: string, user: User): Observable<AuthResponse> {
    const url: string = `${this.apiBaseUrl}${urlPath}`;
    return this.http
      .post<AuthResponse>(url, user)
      .pipe(   
        catchError(this.errors.handleError),
      );
  }
}
