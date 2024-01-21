import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tourDetails } from '../interfaces/tours';
import { ToursService } from '../services/tours.service';

@Component({
  selector: 'app-create-tours',
  templateUrl: './create-tours.component.html',
  styleUrls: ['./create-tours.component.css'],
})
export class CreateToursComponent {
  createToursForm!: FormGroup;
  buttonClicked: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toursService: ToursService
  ) {
    console.log('I am called tours');

    this.createToursForm = formBuilder.group({
      destination: ['', [Validators.required]],
      description: ['', [Validators.required]],
      image: ['', [Validators.required]],
      duration: ['', [Validators.required]],
      price: ['', [Validators.required]],
      start_date: ['', [Validators.required]],
    });
  }
  createTour() {
    this.buttonClicked = true;
    console.log('try again');

    if (this.createToursForm.valid) {
      let createdTour: tourDetails = this.createToursForm.value;

      this.toursService.addTour(createdTour).subscribe((res) => {
        console.log('Tour created successfully', createdTour);
        // return;
      });
    } else {
      console.log('Invalid entry');
    }
  }
}
