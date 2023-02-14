import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {

  constructor(
    private authenticationService: AuthenticationService
  ) {}

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }
  
  protected onLogout(): void {
    return this.authenticationService.logout();
  }
}
