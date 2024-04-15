import { Component, OnDestroy, OnInit } from '@angular/core';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { RecipesService } from '../../Services/recipes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit, OnDestroy {

  isMyRecipes!: boolean;
  recipesData: any[] = [];
  deletedRecipeId: any;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService
  ) { 
    this.route.url.subscribe(url => {
      this.isMyRecipes = (url[0].path === 'myrecipes');
    });
  }

  //// snackbar initialization
  openSnackBar(message: string, panelClass: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 2000, 
      panelClass: [panelClass],
    });
  }

  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.loadrecipes();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  //view recipe data
  ViewRecipe(recipeid: any){
    console.log("view recipe data", recipeid)
    this.router.navigate(['/features/recipedetail/', recipeid])
  }

  addToFavorites(_t9: any) {
    throw new Error('Method not implemented.');
  }

  Delete(recipeId: any) {
    this.recipesService.deleteRecipe(recipeId).pipe(
      takeUntil(this.destroy$),
      catchError((error) => {
        console.error('Error deleting recipe:', error);
        this.openSnackBar('Error deleting recipe', 'error-notification');
        return throwError(error);
      }),
      finalize(() => {
        this.openSnackBar('Recipe deleted successfully', 'success-notification');
        this.router.navigate(['/features/myrecipes']);
      })
    ).subscribe();
  }

  //load the recipes
  loadrecipes() {
    const userId = localStorage.getItem('loggedInUserId') ?? '';
    //load the current logged in user's recipes
    if (this.isMyRecipes) {
      this.recipesService.getmyRecipe(userId).pipe(
        takeUntil(this.destroy$),
        tap((recipes) => {
          this.recipesData = recipes;
          this.recipesData = this.recipesData.filter((recipe: { id: any; }) => recipe.id !== this.deletedRecipeId);
        }),
        catchError((error) => {
          console.error('Error loading recipes:', error);
          return throwError(error);
        })
      ).subscribe();
    } else {
      //Show all the recipes 
      this.recipesService.getrecipes().pipe(
        takeUntil(this.destroy$),
        tap((recipes) => {
          this.recipesData = recipes;
          this.recipesData = this.recipesData.filter((recipe: { id: any; }) => recipe.id !== this.deletedRecipeId);
        }),
        catchError((error) => {
          console.error('Error loading recipes:', error);
          return throwError(error);
        })
      ).subscribe();
    }
  }

  newrecipe(){
    const dialogRef = this.dialog.open(NewRecipeComponent, {
      width: '500px',
      // Prevent closing by clicking outside or pressing ESC
      disableClose: true
    });
  }
}
