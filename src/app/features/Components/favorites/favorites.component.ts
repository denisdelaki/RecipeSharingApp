import { Component, OnDestroy, OnInit } from '@angular/core';
import { catchError, finalize, Subject, takeUntil, tap, throwError } from 'rxjs';
import { RecipesService } from '../../services/recipes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../../shared/interceptor/confirm-dialog/confirm-dialog.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit, OnDestroy {
  recipesData: any[] = [];
  deletedRecipeId: any;
  destroy$: any;

  constructor(private recipeService: RecipesService, 
    private snackBar: MatSnackBar,
    private router: Router,
    private dialog: MatDialog,
  ){

  }

    //// snackbar initialization
    openSnackBar(message: string, panelClass: string): void {
      this.snackBar.open(message, 'Close', {
        duration: 2000, 
        panelClass: [panelClass],
      });
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
    const userId= localStorage.getItem("loggedInUserId")
    if(userId){
      this.recipeService.getFavoriteRecipes(userId).pipe(
        takeUntil(this.destroy$),
        tap((recipes) => {
          this.recipesData = recipes;
          this.recipesData = this.recipesData.filter((recipe: { id: any; }) => recipe.id !== this.deletedRecipeId)
          console.log(this.recipesData);
        })
      ).subscribe();
    }
  }

  ViewRecipe(id: any){
    console.log("view recipe data", id)
    this.router.navigate(['/features/recipedetail/', id])
  }

  confirmDelete(id: string){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // If user confirmed deletion
        this.deleteRecipe(id)
      }
    });
  }


  deleteRecipe(id: string){
    this.recipeService.deleteFavorite(id).pipe(
      takeUntil(this.destroy$),
    catchError((error) => {
      console.error('Error deleting recipe:', error);
       this.openSnackBar('Error deleting recipe', 'error-notification');
      return throwError(error);
    }),
    finalize(() => {
       this.openSnackBar('Recipe deleted successfully', 'success-notification');
    })
  ).subscribe();
}
}