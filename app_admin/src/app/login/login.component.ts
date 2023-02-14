import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { User } from '../models/user';
import { AuthResponse } from '../models/authresponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formError: string = '';

  public credentials = {
    name: '',
    email: '',
    password: ''
  };

  ngOnInit(): void {} 

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService
  ) {}

  public onLoginSubmit(): void {
    this.formError = '';
    if (!this.credentials.email || !this.credentials.password) {
      this.formError = 'All fields are required, please try again';
    } else {
      this.authenticationService.login(this.credentials as User)
        .subscribe(this.doLogin);
    }
  }

  private doLogin = {
    next: (authResp: AuthResponse) => {
      // alternatively, the auth service can save the token and return something
      this.authenticationService.saveToken(authResp.token);
      this.router.navigateByUrl('list-trips');
    },
    error: (err: Error) => {
      this.formError = err.message; // was thrown by errorService
    }
  }

}
