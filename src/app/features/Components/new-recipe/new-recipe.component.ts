import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css'
})
export class NewRecipeComponent {
  AddRecipe!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<NewRecipeComponent>,private formBuilder: FormBuilder, 
  ){
    this.AddRecipe = this.formBuilder.group({
      title: [''],
      ingredients: [''],
      instructions: [''],
      recipePicture: [''],
      category: ['']
    });
   }

  //category optons 
Categorys = [
  {value: 'BreakFast', viewValue: 'BreakFast'},
  {value: 'Lunch', viewValue: 'Lunch'},
  {value: 'Dinner', viewValue: 'Dinner'},
  {value: 'Snack', viewValue: 'Snack'}
  ];
add() {
throw new Error('Method not implemented.');
}
close() {
  this.dialogRef.close();
}
}