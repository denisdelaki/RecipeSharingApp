import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editrecipe',
  templateUrl: './editrecipe.component.html',
  styleUrl: './editrecipe.component.css'
})
export class EditrecipeComponent {

  editrecipe!: FormGroup;

    //category optons 
Categorys = [
  {value: 'BreakFast', viewValue: 'BreakFast'},
  {value: 'Lunch', viewValue: 'Lunch'},
  {value: 'Dinner', viewValue: 'Dinner'},
  {value: 'Snack', viewValue: 'Snack'}
  ];

  constructor(private formBuilder: FormBuilder, ){
    this.editrecipe = this.formBuilder.group({
      title: ['', [Validators.required]],
      ingredients: ['', [Validators.required]],
      instructions: ['', [Validators.required]],
      recipePicture: ['', [Validators.required], Validators.pattern('https?://.+')],
      category: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });
  }

  save() {
    throw new Error('Method not implemented.');
    }
}
