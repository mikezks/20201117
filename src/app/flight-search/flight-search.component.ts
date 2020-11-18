import { Component, Inject, OnDestroy, OnInit, Optional } from '@angular/core';
import { of, Subscription, timer } from 'rxjs';
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
  subscription: Subscription;

  get flights(): Flight[] {
    return this.flightService.flights;
  }

  constructor(/* @Inject(AbstractFlightService) @Optional()  */ private flightService: AbstractFlightService /* [] */) {
  }

  ngOnInit(): void {
    console.log('flight search was initialized!');
    this.subscription = timer(0, 1000).subscribe(console.log);
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
    this.subscription.unsubscribe();
  }
}
