import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, map, Observable, throwError,} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private apiUrl = 'https://fakestoreapi.com/products/';
  private apiUrl2 = 'https://fakestoreapi.com/products/';
  private apiUrl3 = 'https://fakestoreapi.com/products';

  
  constructor(private http: HttpClient, private snackBar: MatSnackBar) {}

//create Recipes in my recipes page  

createRecipes(FormData: any): Observable<any> {
  return this.http.post<any>(this.apiUrl, FormData).pipe(
    catchError((error: HttpErrorResponse) => {
      this.showErrorMessage('Failed to create recipe, server error ' );
      return throwError(error);
    })
  );
}

  ///get recipes from the server 
  //get logged in userId data 
  getmyRecipe(userId: string, recipeId?: string): Observable<any> {
    if (recipeId) {
      return this.http.get<any>(`${this.apiUrl}${recipeId}?userId=${userId}`).pipe(
        catchError((error: HttpErrorResponse) => {
          this.showErrorMessage('Failed to fetch recipe, server error');
          return throwError(error);
        })
      );
    } else {
      return this.http.get<any[]>(`${this.apiUrl}?userId=${userId}`).pipe(
        catchError((error: HttpErrorResponse) => {
          this.showErrorMessage('Failed to fetch recipes, server error');
          return throwError(error);
        })
      );
    }
  }

  ///get recipes from the server
  getRecipes(recipeId?: string): Observable<any> {
    if (recipeId) {
            // Fetch single recipe during view recipe
      return this.http.get<any>(`${this.apiUrl}${recipeId}`).pipe(
        catchError((error: HttpErrorResponse) => {
          this.showErrorMessage('Failed to fetch recipe, server error');
          return throwError(error);
        })
      );
    } else {
            // Fetch all recipes
      return this.http.get<any>(this.apiUrl).pipe(
        catchError((error: HttpErrorResponse) => {
          this.showErrorMessage('Failed to fetch recipe, server error');
          return throwError(error);
        })
      );
    }
  }

  // Edit a recipe
  editRecipe(recipeId: string, updatedRecipeData: any): Observable<any> {
    return this.http.patch<any>(`${this.apiUrl}${recipeId}`, updatedRecipeData).pipe(
      catchError((error: HttpErrorResponse) => {
        this.showErrorMessage('Failed to edit recipe, server error' );
        return throwError(error);
      })
    );
  }

  
  // Delete a recipe
  deleteRecipe(recipeId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}${recipeId}`).pipe(
      catchError((error: HttpErrorResponse) => {
        this.showErrorMessage('Failed to delete recipe, server error ');
        return throwError(error);
      })
    );
  }


  ///add a recipe to the list of  favorite recipes
 // Add userId parameter to addToFavorites method
 addToFavorites(recipedata: any): Observable<any> {
  return this.http.post<any>(this.apiUrl2, recipedata).pipe(
    catchError((error: HttpErrorResponse) => {
      this.showErrorMessage('Failed to add recipe to favorites, server error');
      return throwError(error);
    })
  );
}

//get favorite recipes
getFavoriteRecipes(userId: any): Observable<any> {
  return this.http.get<any[]>(`${this.apiUrl2}?userId=${userId}`).pipe(
    catchError((error: HttpErrorResponse) => {
      this.showErrorMessage('Failed to fetch favorite recipes, server error');
      return throwError(error);
    })
  );
}

//delete favorite recipe
deleteFavorite(id: string): Observable<any> {
  return this.http.delete<any>(`${this.apiUrl2}${id}`).pipe(
    catchError((error: HttpErrorResponse) => {
      this.showErrorMessage('Failed to delete favorite recipe, server error');
      return throwError(error);
    })
  );
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

    // Method to show error message using MatSnackBar
    public showErrorMessage(message: string): void {
      this.snackBar.open(message, 'Close', {
        duration: 5000, 
        panelClass: ['error-snackbar'] 
      });
    }

// In recipes.service.ts

searchRecipes(searchTerm: string): Observable<any> {
  const userId = localStorage.getItem('loggedInUserId') ?? '';
if (userId) {
  return this.getmyRecipe(userId).pipe(
    map((recipes) => {
      return recipes.filter((item: any) => {
        return item.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
               item.title.toLowerCase().includes(searchTerm.toLowerCase());  
      });
    })
  )
}else{
  return this.getRecipes().pipe(
    map((data: any[]) => {
      // Filter based on search criteria
      return data.filter((item: any) => {
        // Check if the search term matches either category or title
        return item.category.toLowerCase().includes(searchTerm.toLowerCase()) || 
               item.title.toLowerCase().includes(searchTerm.toLowerCase());
      });
    })
  );
}

}

}