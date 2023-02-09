import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { TripListingComponent } from "./trip-listing/trip-listing.component";
import { AddTripComponent } from "./add-trip/add-trip.component";
import { EditTripComponent } from "./edit-trip/edit-trip.component";

// The router manages in one location components and the handles we can use to reference them 
// throughout the program

const routes: Routes = [
    { path: 'add-trip', component: AddTripComponent },
    { path: 'edit-trip', component: EditTripComponent},
    { path: '', component: TripListingComponent, pathMatch: 'full'} // default path
]

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})

export class AppRoutingModule {}