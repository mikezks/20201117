import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  // tslint:disable-next-line: directive-selector
  selector: 'input[city]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: CityValidatorDirective,
      multi: true
    }
  ]
})
export class CityValidatorDirective implements Validator {

  constructor() { }

  validate(control: AbstractControl): ValidationErrors | null {
    const validCities = [
      'Graz',
      'Hamburg',
      'München'
    ];

    if (control.value && validCities.indexOf(control.value) === -1) {
      return {
        city: {
          actualCity: control.value,
          validCities
        }
      };
    }

    return null;
  }

}
