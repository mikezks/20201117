import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, debounceTime } from 'rxjs/operators';
import { validateCity, validateCityWithParams } from 'src/app/shared/validation/city-validator';

@Component({
  selector: 'app-flight-edit',
  templateUrl: './flight-edit.component.html',
  styleUrls: ['./flight-edit.component.css']
})
export class FlightEditComponent implements OnInit {
  editForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      id: [0],
      from: [
        'Graz',
        [
          Validators.required,
          Validators.minLength(3),
          validateCity
        ]
      ],
      to: [
        'Hamburg',
        [
          Validators.required,
          Validators.minLength(3),
          validateCityWithParams([
            'Wien',
            'Berlin',
            'Barcelona'
          ])
        ]
      ],
      date: [
        new Date().toISOString()
      ]
    });

    this.editForm.valueChanges
      .pipe(
        debounceTime(300),
        catchError(err => of({}))
      )
      .subscribe({
        next: editFormValue => console.log('Value of Edit Form', editFormValue),
        error: err => console.error(err),
        complete: () => {}
      });

    this.editForm.patchValue({
      id: 5000
    });
  }

  save(): void {
    console.log('Value', this.editForm.value);
    console.log('Valid', this.editForm.valid);
    console.log('Dirty', this.editForm.dirty);
    console.log('Touched', this.editForm.touched);
  }
}
