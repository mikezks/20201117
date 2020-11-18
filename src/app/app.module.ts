import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { FlightSearchComponent } from './flight-search/flight-search.component';
import { AbstractFlightService } from './flight-search/abstract-flight.service';
import { FlightService } from './flight-search/flight.service';
import { DummyFlightService } from './flight-search/dummy-flight.service';
import { CityPipe } from './shared/pipes/city.pipe';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
  ],
  declarations: [
    AppComponent,
    SidebarComponent,
    NavbarComponent,
    FlightSearchComponent,
    CityPipe
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
