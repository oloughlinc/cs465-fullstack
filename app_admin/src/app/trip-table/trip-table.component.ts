import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-table',
  templateUrl: './trip-table.component.html',
  styleUrls: ['./trip-table.component.css']
})
export class TripTableComponent {

  @Input('trips') trips!: Trip[];

  constructor(
    private router: Router,
    private auth: AuthenticationService,
  ) {}

  protected isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  protected onEditClicked(tripCode: string): void {
    localStorage.removeItem("tripCode");
    localStorage.setItem("tripCode", tripCode);
    this.router.navigate(['edit-trip']);
  }

}
