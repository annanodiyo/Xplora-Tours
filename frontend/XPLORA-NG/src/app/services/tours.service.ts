import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tourDetails } from '../interfaces/tours';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ToursService {
  private apiUrl = 'http://localhost:3800/event/createEvent';

  constructor(private http: HttpClient) {}

  addTour(tour: tourDetails): Observable<any> {
    return this.http.post<any>(this.apiUrl, tour);
  }

  async getTours() {
    let res = await fetch('http://localhost:3800/event/allEvents', {
      headers: {
        'content-type': 'application/json',
      },
    });
    let data = await res.json();
    return data;
  }
}
