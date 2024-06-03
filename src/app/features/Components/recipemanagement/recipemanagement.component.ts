import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipesService } from '../../services/recipes.service';
import { Router } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select'; 
@Component({
  selector: 'app-recipemanagement',
  templateUrl: './recipemanagement.component.html',
  styleUrl: './recipemanagement.component.css'
})
export class RecipemanagementComponent  implements OnInit {

  recipeForm!: FormGroup;
  isEditMode = false;

  //category options
  categories = [
    { value: 'BreakFast', viewValue: 'BreakFast' },
    { value: 'Lunch', viewValue: 'Lunch' },
    { value: 'Dinner', viewValue: 'Dinner' },
    { value: 'Snack', viewValue: 'Snack' }
  ];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RecipemanagementComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public recipesService: RecipesService,
    public snackBar: MatSnackBar,
    private router: Router
  ) {
    this.recipeForm = this.formBuilder.group({
      title: ['', [Validators.required]],
      ingredients: this.formBuilder.array([], [Validators.required]),
      instructions: this.formBuilder.array([], [Validators.required]),
      recipePicture: ['', [Validators.required, Validators.pattern('https?://.+')]],
      category: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });
  }
  

  openSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 1000,
      panelClass: [panelClass],
    });
  }

  ngOnInit(): void {
    if (this.data?.recipeid) {
      this.isEditMode = true;
      this.recipesService.getRecipes(this.data.recipeid).subscribe(recipedata => {
        const ingredientsArray = recipedata?.ingredients.map((ingredient: any) => ingredient.ingredient);
        const instructionsArray = recipedata?.instructions.map((instruction: any) => instruction.instruction);

        ingredientsArray.forEach((ingredient: string) => this.addIngredient(ingredient));
        instructionsArray.forEach((instruction: string) => this.addInstruction(instruction));

        this.recipeForm.patchValue({
          title: recipedata?.title,
          recipePicture: recipedata?.recipePicture,
          category: recipedata?.category,
          time: recipedata?.time
        });
      });
    }
  }

  save() {
    if (this.recipeForm.valid) {
      const recipeData = {
        title: this.recipeForm.value.title,
        ingredients: this.recipeForm.value.ingredients.map((ingredient: string) => ({ ingredient })),
        instructions: this.recipeForm.value.instructions.map((instruction: string) => ({ instruction })),
        recipePicture: this.recipeForm.value.recipePicture,
        category: this.recipeForm.value.category,
        time: this.recipeForm.value.time,
        userId: localStorage.getItem('loggedInUserId')
      };

      if (this.isEditMode) {
        this.recipesService.editRecipe(this.data.recipeid, recipeData).subscribe(response => {
          this.openSnackBar('Recipe updated successfully', 'success-notification');
          this.dialogRef.close();
        });
      } else {
        this.recipesService.createRecipes(recipeData).subscribe(response => {
          this.openSnackBar('Recipe created successfully', 'success-notification');
          this.dialogRef.close();
        });
      }
    } else {
      this.openSnackBar('Invalid form. Please fill in all required fields.', 'error-notification');
    }
  }

  addIngredient(ingredient: string = '') {
    this.ingredientForms.push(this.formBuilder.control(ingredient, Validators.required));
  }

  removeIngredient(index: number) {
    this.ingredientForms.removeAt(index);
  }

  addInstruction(instruction: string = '') {
    this.instructionForms.push(this.formBuilder.control(instruction, Validators.required));
  }

  removeInstruction(index: number) {
    this.instructionForms.removeAt(index);
  }

  get instructionForms() {
    return this.recipeForm.get('instructions') as FormArray;
  }

  get ingredientForms() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  close() {
    this.dialogRef.close();
  }
}