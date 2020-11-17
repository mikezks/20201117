import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Flight } from '../entities/flight';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FlightService {

  constructor(private http: HttpClient) { }

  find(from: string, to: string): Observable<Flight[]> {
    const url = 'http://www.angular.at/api/flight';

    const params = new HttpParams()
                    .set('from', from)
                    .set('to', to);

    const headers = new HttpHeaders()
                    .set('Accept', 'application/json');

    return this.http
      .get<Flight[]>(url, { params, headers })
      .pipe(
        // map(flights => flights.length)
        tap(flights => console.log('tap inside service find()', flights))
        // tap(console.log)
      );
  }
}
