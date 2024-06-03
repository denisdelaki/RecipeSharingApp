import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { of } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipesService } from './recipes.service';

describe('RecipesService', () => {
  let service: RecipesService;
  let httpMock: HttpTestingController;
  let httpClientSpy: { get: jest.Mock };
  let matSnackBarMock: { open: jest.Mock };

  beforeEach(async () => {
    httpClientSpy = { get: jest.fn() };

    matSnackBarMock = { open: jest.fn() };

 service = new RecipesService(httpClientSpy as any, matSnackBarMock as unknown as MatSnackBar);

    await TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule], 
      providers: [RecipesService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(RecipesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Verify that no outstanding HTTP requests remain
    httpMock.verify(); 
  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  //test create service
  it('should create a recipe', () => {
    const formData = {
      title: 'Test Recipe',
      category: 'Test Category',
      ingredients: 'Test Ingredients',
      steps: 'Test Steps',
      image: 'Test Image'
    };
    const mockResponse = { id: '1', ...formData };

    service.createRecipes(formData).subscribe(recipe => {
      expect(recipe).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/recipes/');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should handle error when creating a recipe', () => {
    const formData = {
      title: 'Test Recipe',
      category: 'Test Category',
      ingredients: 'Test Ingredients',
      steps: 'Test Steps',
      image: 'Test Image'
    };

    service.createRecipes(formData).subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/recipes/');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('server error')); 
  });

  it('should handle error when fetching recipes', () => {
    const errorMessage = 'Failed to fetch recipe, server error';
    const mockError = new HttpErrorResponse({ error: errorMessage, status: 500 });
  
    // Mocking the showErrorMessage method to do nothing
    jest.spyOn(service, 'showErrorMessage').mockImplementation(() => {});
  
    // Subscribing to the service method
    service.getRecipes().subscribe({
      error: (error) => {
        // Assert that error is truthy
        expect(error).toBeTruthy(); 
        // Assert that showErrorMessage was called with the correct error message
        expect(service.showErrorMessage).toHaveBeenCalledWith(errorMessage); 
        // Assert that the error thrown matches the mock error
        expect(error).toEqual(mockError); 
      }
    });
  
    // Intercepting the HTTP request
    const req = httpMock.expectOne('http://localhost:3000/recipes/');
    expect(req.request.method).toBe('GET');
    
    // Respond to the request with an error using flushError
    req.flush(null, { status: 500, statusText: errorMessage });
  });
  
  
  
  

  
  //test get my recipes method
  it('should get my recipes without recipeId', () => {
    const userId = 'testUserId';
    const mockRecipes = [{ id: '1', title: 'Recipe 1' }, { id: '2', title: 'Recipe 2' }];

    service.getmyRecipe(userId).subscribe(recipes => {
      expect(recipes).toEqual(mockRecipes);
    });

    const req = httpMock.expectOne(`http://localhost:3000/recipes/?userId=${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRecipes);
  });

  it('should get a single recipe with recipeId', () => {
    const userId = 'testUserId';
    const recipeId = '1';
    const mockRecipe = { id: recipeId, title: 'Recipe 1' };

    service.getmyRecipe(userId, recipeId).subscribe(recipe => {
      expect(recipe).toEqual(mockRecipe);
    });

    const req = httpMock.expectOne(`http://localhost:3000/recipes/${recipeId}?userId=${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockRecipe);
  });

  it('should fetch all recipes', () => {
    const mockResponse = [{ id: '1', title: 'Recipe 1' }, { id: '2', title: 'Recipe 2' }];

    service.getRecipes().subscribe(recipes => {
      expect(recipes).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/recipes/');
    expect(req.request.method).toBe('GET');
    
    // Respond to the request with the mock response
    req.flush(mockResponse);
  });

  it('should fetch a single recipe', () => {
    const recipeId = '123';
    const mockResponse = { id: recipeId, title: 'Test Recipe' };

    service.getRecipes(recipeId).subscribe(recipe => {
      expect(recipe).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://localhost:3000/recipes/${recipeId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

  it('should handle error when fetching recipes', () => {
    service.getRecipes().subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/recipes/');
    expect(req.request.method).toBe('GET');
    req.error(new ErrorEvent('server error')); 
  });

  it('should edit a recipe', () => {
    const recipeId = '1';
    const updatedRecipeData = {
      title: 'Updated Recipe Title',
      category: 'Updated Category',
      ingredients: 'Updated Ingredients',
      steps: 'Updated Steps',
      image: 'Updated Image'
    };
    const mockResponse = { id: recipeId, ...updatedRecipeData };

    service.editRecipe(recipeId, updatedRecipeData).subscribe(recipe => {
      expect(recipe).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://localhost:3000/recipes/${recipeId}`);
    expect(req.request.method).toBe('PATCH');
    req.flush(mockResponse);
  });

  it('should handle error when editing a recipe', () => {
    const recipeId = '1';
    const updatedRecipeData = {
      title: 'Updated Recipe Title',
      category: 'Updated Category',
      ingredients: 'Updated Ingredients',
      steps: 'Updated Steps',
      image: 'Updated Image'
    };

    service.editRecipe(recipeId, updatedRecipeData).subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
      }
    });

    const req = httpMock.expectOne(`http://localhost:3000/recipes/${recipeId}`);
    expect(req.request.method).toBe('PATCH');
    req.error(new ErrorEvent('server error'));
  });

  it('should delete a recipe', () => {
    const recipeId = '1';

    service.deleteRecipe(recipeId).subscribe(() => {
      // No need to check response for delete requests
      expect(true).toBeTruthy();
    });

    const req = httpMock.expectOne(`http://localhost:3000/recipes/${recipeId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null); // No response body for delete requests
  });

  it('should handle error when deleting a recipe', () => {
    const recipeId = '1';

    service.deleteRecipe(recipeId).subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
      }
    });

    const req = httpMock.expectOne(`http://localhost:3000/recipes/${recipeId}`);
    expect(req.request.method).toBe('DELETE');
    req.error(new ErrorEvent('server error'));
  });

  it('should add a recipe to favorites', () => {
    const recipeData = { id: '1', title: 'Test Recipe' };
    const mockResponse = { ...recipeData };

    service.addToFavorites(recipeData).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne('http://localhost:3000/favoriterecipes/');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should handle error when adding a recipe to favorites', () => {
    const recipeData = { id: '1', title: 'Test Recipe' };

    service.addToFavorites(recipeData).subscribe({
      error: (error) => {
        expect(error).toBeTruthy();
      }
    });

    const req = httpMock.expectOne('http://localhost:3000/favoriterecipes/');
    expect(req.request.method).toBe('POST');
    req.error(new ErrorEvent('server error'));
  });

  it('should get favorite recipes', () => {
    const userId = 'testUserId';
    const mockResponse = [{ id: '1', title: 'Favorite Recipe 1' }, { id: '2', title: 'Favorite Recipe 2' }];

    service.getFavoriteRecipes(userId).subscribe(recipes => {
      expect(recipes).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(`http://localhost:3000/favoriterecipes/?userId=${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockResponse);
  });

});

describe('searchRecipes', () => {
  let service: RecipesService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [RecipesService]
    }).compileComponents();

    service = TestBed.inject(RecipesService);
  }));

  it('should search recipes based on category or title when user is logged in', () => {
    const searchTerm = 'test';
    const userId = 'testUserId';
    const mockRecipes = [
      { id: '1', title: 'Test Recipe 1', category: 'Test Category 1' },
      { id: '2', title: 'Test Recipe 2', category: 'Test Category 2' }
    ];
  
    // Mocking getmyRecipe method
    jest.spyOn(service, 'getmyRecipe').mockReturnValue(of(mockRecipes));
  
    service.searchRecipes(searchTerm).subscribe(recipes => {
      expect(recipes.length).toBe(2);
      expect(recipes).toEqual(mockRecipes); // Ensure returned recipes match mock data
  
      // Verify that getmyRecipe is called only once after the subscribe callback
      expect(service.getmyRecipe).toHaveBeenCalledWith(userId);
      expect(service.getmyRecipe).toHaveBeenCalledTimes(1);
    });
  });
  

  it('should search recipes based on category or title when user is not logged in', () => {
    const searchTerm = 'test';
    const mockRecipes = [
      { id: '1', title: 'Test Recipe 1', category: 'Test Category 1' },
      { id: '2', title: 'Test Recipe 2', category: 'Test Category 2' }
    ];
  
    // Mocking getRecipes method
    jest.spyOn(service, 'getRecipes').mockReturnValue(of(mockRecipes));
  
    service.searchRecipes(searchTerm).subscribe(recipes => {
      expect(recipes).toEqual(mockRecipes); 
  
      // Verify that getRecipes is called only once after the subscribe callback
      expect(service.getRecipes).toHaveBeenCalledTimes(1);
    });
  });
  
});