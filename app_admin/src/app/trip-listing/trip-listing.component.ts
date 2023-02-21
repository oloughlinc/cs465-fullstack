import { Component } from '@angular/core';
import { Router } from "@angular/router";

// for testing
// import { trips } from '../data/trips';

import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';
import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService]
})

// i had no luck even getting the starter page up with
// the very outdate angular v6 so am using the latest version

// using code from here instead
// https://angular.io/guide/http

export class TripListingComponent {

  trips: Trip[] = [];
  message: string = '';

  Views = {
    Card: "card",
    List: "list",
  };
  currentView = this.Views.Card;

  constructor(
    private tripDataService: TripDataService,
    private router: Router,
    private auth: AuthenticationService,
    ) {}

  private getTrips(): void {
    console.log('Inside TripListingComponent#getTrips');
    this.message = 'Searching for trips';
    this.tripDataService.getTrips().subscribe(this.onGetTrips);
    // unsubscribe needed?
  }

  // https://angular.io/guide/observables
  // what to do on each subscribe, that is, each call to the observable 'blueprint'
  private onGetTrips = {
    next: (foundTrips: Trip[]) => {
      this.trips = foundTrips; 
    },
    error: (err: Error) => {
      this.message = err.message;
    },
    complete: () => {
      this.message = this.trips.length > 0 ? '' : 'No trips found';
    }
  }

  protected toggleView() {
    if (this.currentView === this.Views.Card) {
      this.currentView = this.Views.List;
    } else {
      this.currentView = this.Views.Card;
    }
  }

  // move to different component
  protected addTrip(): void {
    this.router.navigate(['add-trip']);
  }
  
  // call get trips when initializing this component
  ngOnInit(): void {
    this.getTrips();
  }

  protected isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

}
