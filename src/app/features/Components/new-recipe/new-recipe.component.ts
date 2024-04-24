import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
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
      ingredients: this.formBuilder.array([''], [Validators.required]),
      instructions: this.formBuilder.array([''], [Validators.required]),
      recipePicture: ['', [Validators.required, Validators.pattern('https?://.+')]],
      time: ['', [Validators.required]],
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
    ingredients: this.AddRecipe.value.ingredients.map((ingredient: string) => ({ ingredient: ingredient })),
    instructions: this.AddRecipe.value.instructions.map((instruction: string) => ({ instruction: instruction })),
    time: this.AddRecipe.value?.time,
    recipePicture: this.AddRecipe.value?.recipePicture,
    category: this.AddRecipe.value?.category,
    userId: localStorage.getItem('loggedInUserId')
  }
  console.log(recipeData);

  this.recipesService.createRecipes(recipeData).subscribe(
    response => {
      console.log(response)
      this.recipesdata.push({
          title: response.title,
          category: response.category,
          ingredients: response.ingredients.map((ingredient: { ingredient: string }) => ingredient.ingredient),
          instructions: response.instructions.map((instruction: { instruction: string }) => instruction.instruction),
          time: response.time,
          recipeUrl: response.recipeUrl,
          userId: response.userId
      })
      this.openSnackBar('Recipe created successfully', 'success-notification');
      // this.router.navigate(['/recipes/myrecipe'])
      
    })
  this.dialogRef.close();
}
else{
  this.openSnackBar('Invalid form. Please fill in all required fields.', 'error-notification');
}
}
addIngredient() {
  this.ingredientForms.push(this.formBuilder.control('', Validators.required));
}

removeIngredient(index: number) {
  this.ingredientForms.removeAt(index);
}

addInstruction(){
  this.instructionForms.push(this.formBuilder.control('', Validators.required));
}

removeInstruction(index: number) {
  this.instructionForms.removeAt(index);
}

get instructionForms() {
  return this.AddRecipe.get('instructions') as FormArray;
} 

get ingredientForms() {
  return this.AddRecipe.get('ingredients') as FormArray;
}
close() {
  this.dialogRef.close();
}
}