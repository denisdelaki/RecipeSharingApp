import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private apiUrl = 'http://localhost:3000/recipes/';
  
  constructor(private http: HttpClient) {}

  ///get recipes from the server 
  //get logged in userId data 
  getmyRecipe( userId: string,recipeId?: string): Observable<any> {
    if (recipeId) {
      // Fetch single recipe during view recipe for logged user
      return this.http.get<any>(`${this.apiUrl}${recipeId}?userId=${userId}`);
    } else {
      // Fetch all recipes
      return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`);
    }
  }

  ///get recipes from the server
  getRecipes(recipeId?: string): Observable<any> {
    if (recipeId) {
      // Fetch single recipe during view recipe
      return this.http.get<any>(`${this.apiUrl}${recipeId}`);
    } else {
      // Fetch all recipes
      return this.http.get<any>(this.apiUrl);
    }
  }
//create Recipes in my recipes page  

createRecipes(FormData:any): Observable<any>{
  console.log(FormData);
  return this.http.post<any>(this.apiUrl, FormData);
}
  // Edit a recipe
  editRecipe(recipeId: string, updatedRecipeData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}${recipeId}`, updatedRecipeData);
  }

  
  // Delete a recipe
  deleteRecipe(recipeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${recipeId}`);
  }

    // Like a recipe
    likeRecipe(recipeId: string): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}${recipeId}/like`, {});
    }
//search recipes 
  //searched data to be passed to myrecipes or ALLRECIPES
  private searchDataSubject = new BehaviorSubject<any[]>([]);
  searchData$ = this.searchDataSubject.asObservable();

  private showSearchResultsSubject = new BehaviorSubject<boolean>(false);
  showSearchResults$ = this.showSearchResultsSubject.asObservable();
  
  updateSearchData(data: any[]): void {
    this.searchDataSubject.next(data);
  }
  setShowSearchResults(value: boolean): void {
    this.showSearchResultsSubject.next(value);
  }

  getrecipes(): Observable<any>{
 
  let url="http://localhost:3000/recipes/";
  // console.log(model.searchBy);
  return this.http.get<any[]>(`${url}`);
}
searchRecipes(model: any): Observable<any> {
  let url = "http://localhost:3000/recipes/";
  let searchBy = model.searchBy;
  let searchTerm = model.searchTerm;

  return this.getrecipes().pipe(
    map(data => {
      // Filter based on search criteria
      return data.filter((item: any) => {
        if (searchBy === 'title') {
          return item.title.toLowerCase().includes(searchTerm.toLowerCase());
        } else if (searchBy === 'category') {
          return item.category.toLowerCase().includes(searchTerm.toLowerCase());
        }
        // Add more conditions based on your data model if needed
        return true;
      });
    })
  );
}

}