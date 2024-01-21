import { Component } from '@angular/core';
import { getTours } from '../interfaces/tours';
import { ToursService } from '../services/tours.service';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  styleUrls: ['./tours.component.css'],
})
export class ToursComponent {
  allTours: getTours[] = [];
  constructor(private tourService: ToursService) {}
  ngOnInit() {
    this.getAllTours();
  }
  getAllTours() {
    this.tourService.getTours().then((data) => {
      console.log(data);
      this.allTours = data.tours;
      console.log(this.allTours);
    });
  }
}
