import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';
import { MatDialog  } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, throwError } from 'rxjs';
import { RecipesService } from '../../Services/recipes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, finalize, takeUntil, tap } from 'rxjs/operators';
import { EditrecipeComponent } from '../editrecipe/editrecipe.component';
import { ConfirmDialogComponent } from '../../../shared/Interceptor/confirm-dialog/confirm-dialog.component';
import { DataTransmitService } from '../../../shared/Services/data-transmit.service';
import { SearchComponent } from '../../../shared/Components/search/search.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit, OnDestroy {

  isMyRecipes!: boolean;
  recipesData: any[] = [];
  deletedRecipeId: any;
  favoriterecipe:  any[] = [];
  @ViewChild(SearchComponent) searchComponent!: SearchComponent; 

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService,
    private transferService: DataTransmitService
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

  openSnackBarWithLink(message: string, panelClass: string, linkText: string, linkUrl: string): void {
    const snackBarRef = this.snackBar.open(message, linkText, {
      duration: 5000,
      panelClass: panelClass,
    });
    snackBarRef.onAction().subscribe(() => {
      this.router.navigateByUrl(linkUrl);
    });
  }

  private destroy$: Subject<void> = new Subject<void>();

  ngOnInit(): void {
    this.loadrecipes();
    //subscribe to changes when user searches for recipes
    this.transferService.searchedData$.pipe(
      takeUntil(this.destroy$),
      tap(recipes => this.recipesData = recipes)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
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
      this.recipesService.getRecipes().pipe(
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

  //view recipe data
  ViewRecipe(recipeid: any){
    console.log("view recipe data", recipeid)
    this.router.navigate(['/features/recipedetail/', recipeid])
  }

  addToFavorites(recipedata: any) {
    // Get the current logged-in user ID
    const userId = localStorage.getItem('loggedInUserId');
  
    // Check if the user is logged in
    if (!userId) {
      // Handle the case when the user is not logged in
      this.openSnackBar('You must be logged in to add favorite recipes', 'error-snackbar');
      return;
      console.error('User is not logged in');
      return; // Exit the function
    }
    const dataToFavorite = {
      title: recipedata.title,
      ingredients: recipedata.ingredients,
      instructions: recipedata.instructions,
      recipePicture: recipedata.recipePicture,
      category: recipedata.category,
      time: recipedata.time,
      userId: userId,
    };
    console.log(dataToFavorite)
    this.recipesService.addToFavorites(dataToFavorite).subscribe(recipes =>{
      this.favoriterecipe.push(dataToFavorite);
      this.openSnackBarWithLink('Recipe added to favorites', 'success-notification', 'View favorites', '/features/favorites');    }),
      catchError((error) => {
        console.error('Error adding recipe to favorites:', error);
        this.openSnackBar('Error adding recipe to favorites', 'error-notification');
        return (error);
      })
  }
  

  //edit recipe details
  editRecipe(recipeid: any){
      console.log("edit recipe", recipeid)
      const dialogRef = this.dialog.open(EditrecipeComponent, {
        width: '550px',
        // Prevent closing by clicking outside or pressing ESC
        disableClose: true,
        //pass the recipe id to edit recipe component 
        data: { recipeid: recipeid }
      });
      this.loadrecipes();
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
        // this.confirmDelete();
        this.openSnackBar('Recipe deleted successfully', 'success-notification');
        this.loadrecipes();
      })
    ).subscribe();
  }
   confirmDelete(recipeId: any){
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // If user confirmed deletion
        this.Delete(recipeId)
      }
    });
  }

  newrecipe(){
    const dialogRef = this.dialog.open(NewRecipeComponent, {
      width: '500px',
      // Prevent closing by clicking outside or pressing ESC
      disableClose: true
    });
  }

    // Accessing searchForm from SearchComponent
    getSearchForm(): FormGroup | undefined {
      return this.searchComponent ? this.searchComponent.searchForm : undefined;
    }
    
}
