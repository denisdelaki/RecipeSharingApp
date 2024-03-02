import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../core/recipes.service';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrl: './edit-recipe.component.scss'
})
export class EditRecipeComponent implements OnInit {
  recipeId: any;
  constructor(private formBuilder: FormBuilder, 
    private recipeservice: RecipesService,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
    private router:Router) { }
  //category optons 
Categorys = [
  {value: 'BreakFast', viewValue: 'BreakFast'},
  {value: 'Lunch', viewValue: 'Lunch'},
  {value: 'Dinner', viewValue: 'Dinner'},
  {value: 'Snack', viewValue: 'Snack'}
];
openSnackBar(message: string, panelClass: string): void {
  this.snackBar.open(message, 'Close', {
    duration: 1000, 
    panelClass: [panelClass],
  });
}
//form initialization 
  editrecipeForm!:FormGroup;
ngOnInit(): void {
  this.editrecipeForm = this.formBuilder.group({
    title: [''],
    category: [''],
    ingredients: [''],
    instruction: [''],
    recipimgurl: ['']
  });
  // Retrieve recipe ID from route parameters
  this.route.params.subscribe(params => {
    this.recipeId = params['id'];
    // Fetch recipe data using this.recipeId and populate form fields
    this.fetchRecipeData(this.recipeId);
  });
}

fetchRecipeData(recipeId: any) {
 //fetch recipe data from service based on recipeId
  this.recipeservice.getData(recipeId).subscribe(recipe => {
    ///const recipeId= recipe.id;
    // Populate form fields with fetched data
    this.editrecipeForm.patchValue({
      title: recipe.title,
      category: recipe.category,
      ingredients: recipe.ingredients,
      instruction: recipe.instruction,
      recipimgurl: recipe.recipimgurl
    });
  });
}
  
Edit() {
  if (this.editrecipeForm.valid){
    const userId = localStorage.getItem('loggedInUserId');
    const updatedrecipeData = {
      title: this.editrecipeForm.value.title,
      category: this.editrecipeForm.value.category,
      ingredients: this.editrecipeForm.value.ingredients,
      instruction: this.editrecipeForm.value.instruction,
      recipimgurl: this.editrecipeForm.value.recipimgurl,
      userId: userId
    }
    this.recipeservice.editRecipe(this.recipeId, updatedrecipeData).subscribe((res)=>{
      console.log(res);
      this.openSnackBar('Recipe Editted successfully', 'success-notification');
      // Refresh recipe data after deleting 
      setTimeout(() => {
        window.location.reload();
        this.router.navigate(['/recipes/myrecipe']);
      }, 1000);      
    },
    (error) => {
      // Error while deleting recipe
      console.error('Error Editting recipe:', error);
      this.openSnackBar('Error deleting recipe', 'error-notification');
    })    
  }
  this.router.navigate(['/recipes/myrecipe']);
  }
  close() {
    this.router.navigate(['/recipes/myRecipes'])
  }
}
