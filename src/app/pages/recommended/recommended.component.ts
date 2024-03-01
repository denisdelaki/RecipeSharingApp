import { Component } from '@angular/core';
import { RecipesService } from '../../core/recipes.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-recommended',
  templateUrl: './recommended.component.html',
  styleUrl: './recommended.component.scss'
})
export class RecommendedComponent {
  recipes: any[] = [];
  constructor(private recipesservice: RecipesService, private router :Router){}
  ngOnInit(): void {
    this.recipesservice.getData().subscribe((data: any) => {
      console.log(data);
      this.recipes = data;
      console.log(this.recipes)
    }, error=>{
      console.error('Error fetching data:', error); 
    });
   }
   viewRecipeDetails(recipeId: any) {
    this.router.navigate(['/viewRecipes', recipeId]);
    }
}
