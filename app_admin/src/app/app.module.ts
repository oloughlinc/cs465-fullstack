import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { TripListingComponent } from './trip-listing/trip-listing.component';
import { TripCardComponent } from './trip-card/trip-card.component';
import { TripDataService } from './services/trip-data.service';

@NgModule({
  declarations: [
    AppComponent,
    TripListingComponent,
    TripCardComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    TripDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
