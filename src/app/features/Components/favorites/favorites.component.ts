import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil, tap } from 'rxjs';
import { RecipesService } from '../../Services/recipes.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit, OnDestroy {
  recipesData: any[] = [];
  destroy$: any;

  constructor(private recipeService: RecipesService){

  }
  ngOnInit(): void {
    this.destroy$ = new Subject();
    this.loadFavorites();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  loadFavorites(){
    this.recipeService.getFavoriteRecipes().pipe(
      takeUntil(this.destroy$),
      tap((recipes: any[]) => this.recipesData = recipes)
    ).subscribe();
  }

  ViewRecipe(recipedata: any){}

  confirmDelete(id: number){
    this.deleteRecipe(id)
  }
  deleteRecipe(id: number){
    this.recipeService.deleteFavorite(id).pipe(
      takeUntil(this.destroy$),
      tap((recipes: any[]) => this.recipesData = recipes)
    ).subscribe();
  }
}