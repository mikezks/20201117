import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { CoreModule } from './core/core.module';
import { FlightBookingModule } from './flight-booking/flight-booking.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    FlightBookingModule
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
