import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Flight } from '../../entities/flight';
import { AbstractFlightService } from './abstract-flight.service';

@Injectable()
export class DummyFlightService implements AbstractFlightService {
  flights: Flight[] = [];

  find(from: string, to: string): Observable<Flight[]> {
    return of([
      {
        id: 999,
        from: 'London',
        to: 'New York',
        date: new Date().toISOString(),
        delayed: false
      }
    ]);
  }
}
