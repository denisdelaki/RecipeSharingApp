import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../core/recipes.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesData } from '../Interface/RecipeData';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-new-recipe',
  templateUrl: './new-recipe.component.html',
  styleUrl: './new-recipe.component.scss'
})
export class NewRecipeComponent{
  
constructor(private formBuilder: FormBuilder,private snackBar: MatSnackBar, private recipeservice: RecipesService, private router:Router) { }

recipesinfo: RecipesData []=[];
recipes: any={
    title: "",
    category: "",
    ingredients: "",
    instruction: "",
    recipeUrl: ""
}
//category optons 
Categorys = [
{value: 'BreakFast', viewValue: 'BreakFast'},
{value: 'Lunch', viewValue: 'Lunch'},
{value: 'Dinner', viewValue: 'Dinner'},
{value: 'Snack', viewValue: 'Snack'}
];

//handle form control change
recipeForm=new FormGroup({
  title : new FormControl('', Validators.required),
  category : new FormControl('', Validators.required),
  ingredients : new FormControl('', Validators.required),
  instruction : new FormControl('', Validators.required),
  recipimgurl : new FormControl('', Validators.required)
})
formZ!: FormGroup
ngOnInit(): void {
this.formZ = this.formBuilder.group({
  name : ['']
})
   
}
openSnackBar(message: string, panelClass: string): void {
  this.snackBar.open(message, 'Close', {
    duration: 1000, 
    panelClass: [panelClass],
  });
}
//submit created recipe
Add(){
  if (this.recipeForm.valid) {
    const getTitle = this.recipeForm.get('title');
    const getCategory = this.recipeForm.get('category');
    const getIngredients = this.recipeForm.get('ingredients');
    const getInstruction = this.recipeForm.get('instruction');
    const getRecipeUrl = this.recipeForm.get('recipimgurl');
      if (getTitle && getCategory && getIngredients && getInstruction && getRecipeUrl){
        const title=getTitle.value;
        const ingredients=getIngredients.value;
        const category=getCategory.value;
        const instruction=getInstruction.value;
        const recipeUrl=getRecipeUrl.value;
        const userId = localStorage.getItem('loggedInUserId');
        console.log(userId)
        const formData = {
          title: title,
          category: category,
          ingredients: ingredients,
          instruction: instruction,
          recipeUrl: recipeUrl,
          userId: userId
        }
        console.log("formdata", formData)
        //push data to the server 
        this.recipeservice.createRecipes(formData).subscribe(
          response => {
            console.log(response)
            this.recipesinfo.push({
                title: response.title,
                category: response.category,
                ingredients: response.ingredients,
                instruction: response.instruction,
                recipeUrl: response.recipeUrl
            })
            this.openSnackBar('Recipe created successfully', 'success-notification');
            this.router.navigate(['/myRecipe'])
          })
      }
  }else{
    console.log("invalid")
    this.openSnackBar('Invalid request', 'error-notification');
  }

}


close() {
  this.router.navigate(['/myRecipe'])
}

}
