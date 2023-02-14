import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  constructor(
    private authService: AuthenticationService,
  ) {}

  public isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

}
