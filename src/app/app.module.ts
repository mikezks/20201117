import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { APP_ROUTES } from './app.routes';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    CoreModule,
    // FlightBookingModule  <-- remove from imports to enable Lazy Loading
  ],
  providers: [
    // { provide: AbstractFlightService, useClass: FlightService, multi: true },
    // { provide: AbstractFlightService, useClass: DummyFlightService, multi: true }
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
