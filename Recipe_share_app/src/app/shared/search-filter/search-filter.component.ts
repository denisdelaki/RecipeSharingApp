import { Component } from '@angular/core';
import { RecipesService } from '../../core/recipes.service';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrl: './search-filter.component.scss'
})
export class SearchFilterComponent {

  searchForm: FormGroup;
  searcheData:any[]=[];
  constructor(private formBuilder: FormBuilder, private recipeService: RecipesService) {
    this.searchForm = this.formBuilder.group({
      searching: [''] ,
      searchBy: ['title'] 
    });
  }
  reset() {
    this.searcheData = [];
    this.recipeService.updateSearchData(this.searcheData);
    this.recipeService.setShowSearchResults(false); 
    }

  onSearch(): void {

    let model= {
       searchTerm : this.searchForm?.get('searching')?.value,
       searchBy : this.searchForm?.get('searchBy')?.value
    }
    this.recipeService.searchRecipes(model).subscribe((data) => {
     console.log("all recipes",data); 
     this.searcheData=[...data];
     console.log("arraydata", this.searcheData)    
     this.recipeService.updateSearchData(this.searcheData);
     console.log("data to be passed as searched", this.searcheData);
     this.recipeService.setShowSearchResults(true); 
    });
  }
}

