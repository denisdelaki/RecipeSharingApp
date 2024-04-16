import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private apiUrl = 'http://localhost:3000/recipes/';
  private apiUrl2 = 'http://localhost:3000/favoriterecipes';
  private apiUrl3 = 'http://localhost:3000/recommended';

  
  constructor(private http: HttpClient) {}

//create Recipes in my recipes page  

createRecipes(FormData:any): Observable<any>{
  console.log(FormData);
  return this.http.post<any>(this.apiUrl, FormData);
}

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

  // Edit a recipe
  editRecipe(recipeId: string, updatedRecipeData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}${recipeId}`, updatedRecipeData);
  }

  
  // Delete a recipe
  deleteRecipe(recipeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${recipeId}`);
  }


  ///add a recipe to the list of  favorite recipes
 // Add userId parameter to addToFavorites method
addToFavorites(recipedata: any): Observable<any> {
  return this.http.post<any>(this.apiUrl2, recipedata);
}

//recipe recommendations
recommend(recipedata: any): Observable<any> {
  return this.http.post<any>(this.apiUrl3, recipedata);
}

getRecommendedRecipes(recipeId?: string): Observable<any> {
  if (recipeId) {
    // Fetch single recipe during view recipe
    return this.http.get<any>(`${this.apiUrl}${recipeId}`);
  } else {
    // Fetch all recipes
    return this.http.get<any>(this.apiUrl);
  }
}

  ///remove a recipe from the list of favorite recipes
  removeFromFavorites(recipeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl2}${recipeId}/favorite`);
  }

}