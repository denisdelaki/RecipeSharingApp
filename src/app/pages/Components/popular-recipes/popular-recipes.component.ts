import { Component, OnInit } from '@angular/core';
import { RecipesService } from '../../../features/Services/recipes.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-popular-recipes',
  templateUrl: './popular-recipes.component.html',
  styleUrl: './popular-recipes.component.css'
})
export class PopularRecipesComponent implements OnInit {
  recipesData: any;

  constructor(private recipesService: RecipesService, private router: Router) { 

  }

  ngOnInit(): void {
    this.fetchRecipes()
  }

  fetchRecipes() {
    this.recipesService.getRecommendedRecipes().subscribe(recipes => {
      this.recipesData = recipes;
    })
  }

  viewrecipe(recipeid: any){
    this.router.navigate(['/features/recipedetail/', recipeid])
  }
}
