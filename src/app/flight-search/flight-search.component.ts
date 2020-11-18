import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { of } from 'rxjs';
import { Flight } from '../entities/flight';
import { AbstractFlightService } from './abstract-flight.service';
import { FlightService } from './flight.service';

@Component({
  selector: 'app-flight-search',
  templateUrl: './flight-search.component.html',
  styleUrls: ['./flight-search.component.css']
})
export class FlightSearchComponent implements OnInit, OnDestroy {
  from = 'Hamburg';
  to = 'Graz';
  selectedFlight: Flight;

  get flights(): Flight[] {
    return this.flightService.flights;
  }

  constructor(/* @Inject(AbstractFlightService) @Optional()  */ private flightService: AbstractFlightService /* [] */,) {
  }

  ngOnInit(): void {
    console.log('flight search was initialized!');
  }

  search(): void {
    this.flightService
      .find(this.from, this.to)
      .subscribe();
  }

  select(flight: Flight): void {
    this.selectedFlight = flight;
  }

  ngOnDestroy(): void {
    console.log('flight search was destroyed!');
  }
}
