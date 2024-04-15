import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-editrecipe',
  templateUrl: './editrecipe.component.html',
  styleUrl: './editrecipe.component.css'
})
export class EditrecipeComponent {

  editrecipe!: FormGroup;
  constructor(private formBuilder: FormBuilder, ){
    this.editrecipe = this.formBuilder.group({
      recipeTitle: ['',], 
      recipeImage: ['', Validators.pattern('https?://.+')],
      recipeDescription: ['',],
      recipeIngredients: ['',],
      recipeInstructions: ['',],
      recipeCategory: ['',],
      recipeTags: ['',],
      recipeRating: ['',]
    });
  }

  save() {
    throw new Error('Method not implemented.');
    }
}
