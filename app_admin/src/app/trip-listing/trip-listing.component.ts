import { Component } from '@angular/core';
// for testing
// import { trips } from '../data/trips';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-trip-listing',
  templateUrl: './trip-listing.component.html',
  styleUrls: ['./trip-listing.component.css'],
  providers: [TripDataService]
})

// NOTE!!!
// i had no luck even getting the starter page up with
// the very outdate angular v6 so am using the latest version

// using code from here instead
// https://angular.io/guide/http

export class TripListingComponent {

  trips: Trip[] = [];
  message: string = '';

  constructor(private tripDataService: TripDataService) {}

  private getTrips(): void {
    console.log('Inside TripListingComponent#getTrips');
    this.message = 'Searching for trips';
    this.tripDataService.getTrips().subscribe(this.onGetTrips);
    // unsubscribe?
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
  
  // call get trips when initializing this component
  ngOnInit(): void {
    this.getTrips();
  }

}
