import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CityPipe } from './pipes/city.pipe';
import { CityValidatorDirective } from './validation/city-validator.directive';



@NgModule({
  declarations: [
    CityPipe,
    CityValidatorDirective
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    CityPipe,
    CityValidatorDirective
  ]
})
export class SharedModule { }
