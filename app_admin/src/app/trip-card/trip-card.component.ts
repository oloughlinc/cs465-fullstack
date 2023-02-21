import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  // allow this component to get an input called trip, that it can pass to its
  // controlled html segment
    @Input('trip') trip: any;

    constructor(
      private router: Router,
      private auth: AuthenticationService,
    ) { }

    protected isLoggedIn(): boolean {
      return this.auth.isLoggedIn();
    }

    protected editTrip(trip: Trip): void {
      localStorage.removeItem("tripCode");
      localStorage.setItem("tripCode", trip.code);
      this.router.navigate(['edit-trip']);
    }
}
