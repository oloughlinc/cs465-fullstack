import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-trip-card',
  templateUrl: './trip-card.component.html',
  styleUrls: ['./trip-card.component.css']
})
export class TripCardComponent {
  // allow this component to get an input called trip, that it can pass to its
  // controlled html segment
    @Input('trip') trip: any;
}
