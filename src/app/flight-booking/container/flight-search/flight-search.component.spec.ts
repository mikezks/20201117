import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';

import { FlightSearchComponent } from './flight-search.component';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {RouterTestingModule} from '@angular/router/testing';
import {By} from '@angular/platform-browser';
import {Observable, of} from 'rxjs';
import {AbstractControl, FormsModule, ValidationErrors} from '@angular/forms';
import {Component, Directive, EventEmitter, Input, Output, Pipe} from '@angular/core';
import {tap} from 'rxjs/operators';
import { Flight } from 'src/app/entities/flight';
import { FlightBookingModule } from '../../flight-booking.module';
import { AbstractFlightService } from '../../services/abstract-flight.service';

describe('FlightSearchComponent', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterTestingModule,
        FlightBookingModule
      ],
      declarations: [
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component.flights.length).toBe(0);
  });

  it('should have a disabled search button w/o params', fakeAsync(() => {
    tick();

    // Get input field for from
    const from = fixture
      .debugElement
      .query(By.css('input[name=from]'))
      .nativeElement;

    from.value = '';
    from.dispatchEvent(new Event('input'));

    // Get input field for to
    const to = fixture
      .debugElement
      .query(By.css('input[name=to]'))
      .nativeElement;

    to.value = '';
    to.dispatchEvent(new Event('input'));

    fixture.detectChanges();
    tick();

    // Get disabled
    const disabled = fixture
      .debugElement
      .query(By.css('button'))
      .properties['disabled'];

    expect(disabled).toBeTruthy();
  }));
});

describe('Unit test with service mock: flight-search.component', () => {
  let component: FlightSearchComponent;
  let fixture: ComponentFixture<FlightSearchComponent>;
  const result = [
    { id: 17, from: 'Graz', to: 'Hamburg', date: 'now', delayed: true },
    { id: 18, from: 'Vienna', to: 'Barcelona', date: 'now', delayed: true },
    { id: 19, from: 'Frankfurt', to: 'Salzburg', date: 'now', delayed: true },
  ];

  const flightServiceMock = {
    find(from: string, to: string): Observable<Flight[]> {
      return of(result)
        .pipe(
          tap(flights => this.flights = flights)
        );
    },
    flights: []
  };

  @Component({ selector: 'app-flight-card', template: '' })
  class FlightCardComponent {
    @Input() item: Flight;
    @Input() selected: boolean;
    @Output() selectedChange = new EventEmitter<boolean>();
  }

  @Directive({ selector: 'input[city]' })
  class CityValidatorDirective {
    @Input() city: string[];
    validate = _ => null;
  }

  // tslint:disable-next-line: use-pipe-transform-interface
  @Pipe({ name: 'city' })
  class CityPipe {
    transform = v => v;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [
        FlightSearchComponent,
        FlightCardComponent,
        CityPipe,
        CityValidatorDirective
      ]
    })
      .overrideComponent(FlightSearchComponent, {
      set: {
        providers: [
          { provide: AbstractFlightService, useValue: flightServiceMock }
        ]
      }
    })
      .compileComponents();

    fixture = TestBed.createComponent(FlightSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should not load flights w/o from and to', () => {
    component.from = '';
    component.to = '';
    component.search();

    expect(component.flights.length).toBe(0);
  });

  it('should load flights w/ from and to', () => {
    component.from = 'Hamburg';
    component.to = 'Graz';
    component.search();

    expect(component.flights.length).toBeGreaterThan(0);
  });
});
