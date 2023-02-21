import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(
    private authService: AuthenticationService,
    private router: Router,
  ) { }

  protected getUrl(): string {
    return this.router.url;
  }

  protected isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  protected onLogout(): void {
    this.authService.logout();
  }
}
