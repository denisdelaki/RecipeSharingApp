import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { takeUntil, delay, Subject } from 'rxjs';
import { RecipesService } from '../../core/recipes.service';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss'
})
export class AllRecipesComponent implements OnInit {
  recipeData: any;
  SearchedRecipes: any;
    //boolen to determine when o render searched data
    showSearchResults: boolean = false;
    constructor(private router :Router, 
      private RecipesService: RecipesService,
      private formbuilder: FormBuilder){}
    search!: FormGroup;
    filter!: FormGroup;
    ngOnInit(): void {
      this.RecipesService.getData().pipe(takeUntil(this.destroy$)).subscribe((data: any) => {
        console.log(data);
        //this.recipeData = data;
        this.recipeData = data || [];
        //this.cdr.detectChanges();
        this.showSearchResults = this.SearchedRecipes && this.SearchedRecipes.length > 0;
        // this.showSearchResultsSubject.next(false);
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
  
    private destroy$: Subject<void> = new Subject<void>();
    ngOnDestroy(): void {
      this.destroy$.next();
      this.destroy$.complete();
    }
    
    Logout(){
      this.router.navigate(['/landingpage']);
    }
    ViewRecipe(recipeId: any){
      console.log('viewed recipe with ID:', recipeId);
      this.router.navigate(['/recipe', recipeId]);
    }
  }
  