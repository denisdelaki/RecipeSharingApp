import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RecipesService } from '../../../features/services/recipes.service';
import { DataTransmitService } from '../../services/data-transmit.service';
import { Subject, takeUntil, tap } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent  implements OnInit, OnDestroy {
  searchForm: FormGroup;
  filteredData: any[] = [];
  showResetIcon = false;
  isMyRecipes!: boolean;
  private destroy$: Subject<void> = new Subject<void>();
  
  constructor(
    private formBuilder: FormBuilder,
    private recipesService: RecipesService,
    private transferService: DataTransmitService,
    private route: ActivatedRoute,
  ) {
    this.searchForm = this.formBuilder.group({
      search: ['']
    });

    this.route.url.subscribe(url => {
      this.isMyRecipes = (url[0].path === 'myrecipes');
    });
  }

  ngOnInit(): void {
    // Initially, load all recipes
    this.filterData();
  }

filterData(): void {
  const searchTerm = this.searchForm.get('search')?.value.trim();
  if (searchTerm) {
    this.showResetIcon= true;
    //show the current logged in user
      this.recipesService.searchRecipes(searchTerm).subscribe(
        (recipes: any[]) => {
          this.transferService.setsearchedData(recipes);
          // this.searchResult.emit(recipes); //
        },
        (error) => {
          console.error('Error fetching recipes:', error);
          // Handle error
        }
      );
  } else {
    this.resetSearch();
    // Handle when search term is empty
  }
}
loadRecipes(): void {
  const userId = localStorage.getItem('loggedInUserId') ?? '';
  if (this.isMyRecipes) {
    this.recipesService.getmyRecipe(userId).pipe(
      takeUntil(this.destroy$),
      tap((recipes) => {
        this.transferService.setsearchedData(recipes);
      })
    ).subscribe(); 
  } else {
    this.recipesService.getRecipes().pipe(
      takeUntil(this.destroy$),
      tap((recipes) => {
        this.transferService.setsearchedData(recipes);
      })
    ).subscribe();
  }
}


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  resetSearch(): void {
    this.searchForm.patchValue({ search: '' });
    this.showResetIcon = false;
    // Reload all recipes when search term is reset
    this.loadRecipes();
  }
}