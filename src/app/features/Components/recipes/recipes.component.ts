import { Component } from '@angular/core';
import { NewRecipeComponent } from '../new-recipe/new-recipe.component';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil, delay } from 'rxjs';
import { RecipesService } from '../../Services/recipes.service';
@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent {
  itemToDelete: any;

addToFavorites(_t9: any) {
throw new Error('Method not implemented.');
}
  isMyRecipes!: boolean;
  recipesData: any;
  constructor(
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private recipesService: RecipesService
  ) { 
    this.route.url.subscribe(url => {
      this.isMyRecipes = (url[0].path === 'myrecipes');
      });
  }

  private destroy$: Subject<void> = new Subject<void>();
  ngOnInit(): void {
   this.loadrecipes() 

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
  Delete(item: any) {
    this.itemToDelete = item;
    }
  //load the recipes
  loadrecipes() {
    const userId = localStorage.getItem('loggedInUserId') ?? '';
    //load the current logged in user's recipes
    if (this.isMyRecipes) {
      this.recipesService.getmyRecipe(userId).pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.recipesData = data;
        console.log(this.recipesData);
      })
    }else{
      //Show all the recipes 
      this.recipesService.getrecipes().pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        this.recipesData = data;
        console.log(this.recipesData);
      })
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
