import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../Services/recipes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError } from 'rxjs';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipeId: any;
  recipe: any;
  recommendedrecipes:  any[] = [];

  constructor( private router: Router, 
    private recipesService: RecipesService,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,){

  }

    //// snackbar initialization
    openSnackBar(message: string, panelClass: string): void {
      this.snackBar.open(message, 'Close', {
        duration: 2000, 
        panelClass: [panelClass],
      });
    }

  ngOnInit(): void {
    ///obtain the recipe id in the url parameter
    this.route.params.subscribe(params => {
      this.recipeId = params['id'];
      
      //fetch the recipe data basing on the obtained id
      this.fetchRecipeData(this.recipeId);
  })
}
  fetchRecipeData(recipeId: any) {
       //fetch recipe data from service based on recipeId
       this.recipesService.getRecipes(recipeId).subscribe(recipe => {
        console.log(recipe)
        this.recipe = recipe;
      })
  }


  recommend(recipedata: any) {
    // Get the current logged-in user ID
    const userId = localStorage.getItem('loggedInUserId');
  
    // Check if the user is logged in
    if (!userId) {
      // Handle the case when the user is not logged in
      this.openSnackBar('You must be logged in to recommend the recipes', 'error-snackbar');
      return;
    }
    const dataToRecommend = {
      title: recipedata.title,
      ingredients: recipedata.ingredients,
      instructions: recipedata.instructions,
      recipePicture: recipedata.recipePicture,
      category: recipedata.category,
      time: recipedata.time,
      userId: userId,
    };
    console.log(dataToRecommend)
    this.recipesService.recommend(dataToRecommend).subscribe(recipes =>{
      this.recommendedrecipes.push(dataToRecommend);
      this.openSnackBar('Recipe Recommended successfully','success-notification');
    }),
      catchError((error: any) => {
        console.error('Error adding recipe to favorites:', error);
        this.openSnackBar('Error Recommending Recipe', 'error-notification');
        return (error);
      })
  }
}
