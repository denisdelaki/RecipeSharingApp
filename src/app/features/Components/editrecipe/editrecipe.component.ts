import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipesService } from '../../Services/recipes.service';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-editrecipe',
  templateUrl: './editrecipe.component.html',
  styleUrl: './editrecipe.component.css'
})
export class EditrecipeComponent implements OnInit {
 
  editrecipe!: FormGroup;
 
    //category optons
Categorys = [
  {value: 'BreakFast', viewValue: 'BreakFast'},
  {value: 'Lunch', viewValue: 'Lunch'},
  {value: 'Dinner', viewValue: 'Dinner'},
  {value: 'Snack', viewValue: 'Snack'}
  ];
 
  constructor(private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditrecipeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private recipesService: RecipesService,
    private snackBar: MatSnackBar,
    private router: Router
   ){
    this.editrecipe = this.formBuilder.group({
      title: ['', [Validators.required]],
      ingredients: ['', [Validators.required]],
      instructions: ['', [Validators.required]],
      recipePicture: ['', [Validators.required, Validators.pattern('https?://.+')]], 
      category: ['', [Validators.required]],
      time: ['', [Validators.required]],
    });    
 
 
    //get the recipe id
    console.log(data.recipeid);
  }
 
  openSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 1000,
      panelClass: [panelClass],
    });
  }
 
  ngOnInit(): void {
    if(this.data.recipeid){
      this.recipesService.getRecipes(this.data.recipeid).subscribe(recipedata => {
        this.editrecipe.patchValue({
          title: recipedata?.title,
          ingredients: recipedata?.ingredients,
          instructions: recipedata?.instructions,
          recipePicture: recipedata?.recipePicture,
          category: recipedata?.category,
          time: recipedata?.time
        })
      });
    }
    else{
      this.openSnackBar('Error fetching the recipe data', 'error-notification');
    }
  
  }
  edit() {
    if (this.editrecipe.valid) {
      const updatedRecipeData = {
        title: this.editrecipe?.value?.title,
        ingredients: this.editrecipe?.value?.ingredients,
        instructions: this.editrecipe?.value?.instructions,
        recipePicture: this.editrecipe?.value?.recipePicture,
        category: this.editrecipe?.value?.category,
        time: this.editrecipe?.value?.time
      }
      console.log(updatedRecipeData);
      this.recipesService.editRecipe(this.data.recipeid, updatedRecipeData).subscribe(
        (response: any) => {
          console.log(response);
          this.dialogRef.close();
          this.openSnackBar('Recipe updated successfully','success-notification');
        })
    }else{
      this.openSnackBar('Please fill all the fields', 'error-notification');
    }
  }
  
    close() {
      this.dialogRef.close();
      this.openSnackBar('Recipe not editted', 'error-notification');
    }
}