import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Flight } from '../entities/fight';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit {
  from = 'Hamburg';
  to = 'Graz';
  flights: Flight[] = [];
  selectedFlight: Flight;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
  }

  search(): void {
    const url = 'http://www.angular.at/api/flight';

    const params = new HttpParams()
                    .set('from', this.from)
                    .set('to', this.to);

    const headers = new HttpHeaders()
                    .set('Accept', 'application/json');

    this.http
      .get<Flight[]>(url, { params, headers })
      .pipe(
        //map(flights => flights.length)
      )
      .subscribe(
        flights => this.flights = flights
      );
  }

  select(flight: Flight): void {
    this.selectedFlight = flight;
  }
}
