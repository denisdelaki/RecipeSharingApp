import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../Services/recipes.service';
@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrl: './recipe-detail.component.css'
})
export class RecipeDetailComponent implements OnInit {
  recipeId: any;
  recipe: any;
  constructor( private router: Router, 
    private recipesService: RecipesService,
    private route: ActivatedRoute,){

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
}
