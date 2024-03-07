import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, delay } from 'rxjs';
import { RecipesService } from '../../core/recipes.service';

@Component({
  selector: 'app-my-recipe',
  templateUrl: './my-recipe.component.html',
  styleUrl: './my-recipe.component.scss'
})
export class MyRecipeComponent implements OnInit {
 
  search!: FormGroup;
  filter!: FormGroup;
  recipeData: any;
  filteredRecipes: any;
  SearchedRecipes: any;
  isMyRecipes!: boolean;
//category optons 
Categorys = [
  {value: 'BreakFast', viewValue: 'BreakFast'},
  {value: 'Lunch', viewValue: 'Lunch'},
  {value: 'Dinner', viewValue: 'Dinner'},
  {value: 'Snack', viewValue: 'Snack'}
];
  //boolen to determine when o render searched data
  showSearchResults: boolean = false;

  constructor(private formBuilder:FormBuilder,
    private RecipesService: RecipesService, 
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar, 
    private route: ActivatedRoute,
    private router: Router){
      this.route.url.subscribe(url => {
        console.log(this.isMyRecipes);
        this.isMyRecipes = (url[0].path === 'myrecipe');
        this.loadData();
        });
       }
    openSnackBar(message: string, panelClass: string): void {
      this.snackBar.open(message, 'Close', {
        duration: 1000, 
        panelClass: [panelClass],
      });
    }
    
  //fetch My recipes from the server when user visit the page 
  //fetch data from the server 
  private destroy$: Subject<void> = new Subject<void>();
  ngOnInit(): void {
   this.loadData() 

  }
  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
  /// data fetching 
  loadData(): void {
    const userId = localStorage.getItem('loggedInUserId') ?? '';

    if (this.isMyRecipes) {
      this.RecipesService.getmyData(userId).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.recipeData = data;
        this.cdr.detectChanges();
       // this.showSearchResults = this.SearchedRecipes && this.SearchedRecipes.length > 0;
      }, error => {
        console.error('Error fetching data:', error);
      });
          // searched data from the service
      this.RecipesService.searchData$.pipe(delay(0)).pipe(takeUntil(this.destroy$)).subscribe((data) => {
      console.log('Received data from search:', data);
      // pick only data for the logged-in user
      this.SearchedRecipes = data.filter((recipe: any) => recipe.userId === userId);
      this.showSearchResults = this.SearchedRecipes && this.SearchedRecipes.length > 0;
      //this.showSearchResultsSubject.next(true);
    });
    } else {
      this.RecipesService.getData().pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.recipeData = data || [];
        this.showSearchResults = this.SearchedRecipes && this.SearchedRecipes.length > 0;
      }, error => {
        console.error('Error fetching data:', error);
      });
      // searched data from the service
      this.RecipesService.searchData$.pipe(delay(0)).pipe(takeUntil(this.destroy$)).subscribe((data) => {
      console.log('Received data from search:', data);
      // pick only data for the logged-in user
      this.SearchedRecipes = data;
      this.showSearchResults = this.SearchedRecipes && this.SearchedRecipes.length > 0;
      //this.showSearchResultsSubject.next(true);
      });
    }
  }
  //like recipe
  like(recipeId: any){
    console.log('Liked recipe with ID:', recipeId);
  }
  edit(recipeId: any){
    console.log('editted recipe with ID:', recipeId);
    this.router.navigate(['/recipes/editrecipe', recipeId]);
  }
  deleteRe(recipeId: any){
    console.log('deleted recipe with ID:', recipeId);
    this.RecipesService.deleteRecipe(recipeId).subscribe(() => {
      console.log('Deleted recipe with ID:', recipeId);     
      this.openSnackBar('Recipe deleted successfully', 'success-notification');
      // Refresh recipe data after deleting 
      setTimeout(() => {        
        this.router.navigate(['/recipes/myRecipes']);
      }, 1000);
    },
    (error) => {
      // Error while deleting recipe
      console.error('Error deleting recipe:', error);
      this.openSnackBar('Error deleting recipe', 'error-notification');
    });
    this.router.navigate(['/recipes/myRecipes']);
}
  ViewRecipe(recipeId: any){
    console.log('viewed recipe with ID:', recipeId);
    this.router.navigate(['/recipe', recipeId]);
  }
 
  //add new recipe by pop up page 
  addRecipe(){
    this.router.navigate(['/recipes/newrecipe'])
 }
}

