import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TripDataService } from '../services/trip-data.service';
import { Trip } from '../models/trip';

@Component({
  selector: 'app-edit-trip',
  templateUrl: './edit-trip.component.html',
  styleUrls: ['./edit-trip.component.css']
})
export class EditTripComponent implements OnInit {

  editForm!: FormGroup;
  submitted = false;

  // each of these will be created as an input field in the component html using a for loop
  // could possibly do using formbuilder.group keys?
  formItems = [
    { name: 'code', label: 'Trip Code'},
    { name: 'name', label: 'Name'},
    { name: 'length', label: 'Length'},
    { name: 'start', label: 'Start Date'},
    { name: 'resort', label: 'Resort'},
    { name: 'perPerson', label: 'Per Person Price'},
    { name: 'image', label: 'Image Link'},
    { name: 'description', label: 'Description'},
  ]

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private tripService: TripDataService
  ) {}

  ngOnInit(): void {
    
    // on init, this will build the forms and prepopulate with the trip data from db
    // under the code that was placed in browser cache when we were sent here
    // by the edit button

    // get the code
    const tripCode = localStorage.getItem("tripCode");
    if (!tripCode) {
      alert("Something went wrong, couldn't find where I stashed tripCode!");
      this.router.navigate(['']);
      return;
    }

    // initialize form
    this.editForm = this.formBuilder.group({
      _id: [],
      code: ['', Validators.required],
      name: ['', Validators.required],
      length: ['', Validators.required],
      start: ['', Validators.required],
      resort: ['', Validators.required],
      perPerson: ['', Validators.required],
      image: ['', Validators.required],
      description: ['', Validators.required],
    })

    // get a fresh copy of the trip data from db using code
    // update form with that data
    this.tripService.getTripByCode(tripCode)
      .subscribe( (trip: Trip) => {
        console.log(trip);
        this.editForm.patchValue(trip);
      });
  }

  // get the form short name to access the form fields
  get f() { return this.editForm.controls; }

  onSubmit() {
    this.submitted = true;
    // send update info to server
    if (this.editForm.valid) {
      this.tripService.updateTrip(this.editForm.value)
        .subscribe(data => {
          console.log(data);
          this.router.navigate(['list-trips']);
        });
    }
  }
}
