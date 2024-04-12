import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RecipesService } from '../../Services/recipes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.css'
})
export class NewRecipeComponent {
  AddRecipe!: FormGroup;
  recipesdata: any[] = [];

  constructor(
    public dialogRef: MatDialogRef<NewRecipeComponent>,
    private formBuilder: FormBuilder, 
    private recipesService: RecipesService,
    private snackBar: MatSnackBar,
    private router: Router
  ){
    this.AddRecipe = this.formBuilder.group({
      title: ['', [Validators.required]],
      ingredients: ['', [Validators.required]],
      instructions: ['', [Validators.required]],
      recipePicture: ['', [Validators.required]],
      category: ['', [Validators.required]],
    });
   }

   openSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 1000, 
      panelClass: [panelClass],
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
console.log(this.AddRecipe.valid);
if (this.AddRecipe.valid){
  const recipeData = {
    title: this.AddRecipe.value.title,
    ingredients: this.AddRecipe.value?.ingredients,
    instructions: this.AddRecipe.value?.instructions,
    recipePicture: this.AddRecipe.value?.recipePicture,
    category: this.AddRecipe.value?.category
  }
  console.log(recipeData);
  this.recipesService.createRecipes(recipeData).subscribe(
    response => {
      console.log(response)
      this.recipesdata.push({
          title: response.title,
          category: response.category,
          ingredients: response.ingredients,
          instruction: response.instruction,
          recipeUrl: response.recipeUrl
      })
      this.openSnackBar('Recipe created successfully', 'success-notification');
      // this.router.navigate(['/recipes/myrecipe'])
      
    })
  this.dialogRef.close();
}
}
close() {
  this.dialogRef.close();
}
}