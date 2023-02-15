import { Component } from '@angular/core';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(
    private authService: AuthenticationService,
  ) { }

  protected isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  protected onLogout(): void {
    this.authService.logout();
  }

}
