import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipesComponent } from './recipes.component';
import { RecipesService } from '../../services/recipes.service';
import { of, Subject, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { RecipemanagementComponent } from '../recipemanagement/recipemanagement.component';

describe('RecipesComponent', () => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;
  let snackBarSpy: jest.Mocked<MatSnackBar>;
  let recipesServiceSpy: jest.Mocked<RecipesService>;
  let router: Router;
  let navigateSpy: jest.SpyInstance;
  let matDialog: MatDialog;

  beforeEach(waitForAsync(() => {
    navigateSpy = jest.fn();
    router = {
      navigate: navigateSpy
    } as any;
    
    snackBarSpy = {
      open: jest.fn().mockReturnValue({ onAction: jest.fn().mockReturnValue(of(null)) }),
      openFromComponent: jest.fn()
    } as unknown as jest.Mocked<MatSnackBar>;

    
    recipesServiceSpy = {
      addToFavorites: jest.fn(),
      getmyRecipe: jest.fn(),
      getRecipes: jest.fn().mockReturnValue(of([])) 
    } as unknown as jest.Mocked<RecipesService>;

    TestBed.configureTestingModule({
      declarations: [RecipesComponent],
      imports: [MatDialogModule, HttpClientModule, RouterTestingModule],
      providers: [
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: RecipesService, useValue: recipesServiceSpy },
        { provide: MatDialog, useValue: { open: jest.fn() } } 
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.componentInstance;
    matDialog = TestBed.inject(MatDialog);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open a snack bar', () => {
    const message = 'Test message';
    const panelClass = 'test-panel-class';
    component.openSnackBar(message, panelClass);
    expect(snackBarSpy.open).toHaveBeenCalledWith(message, 'Close', { duration: 2000, panelClass: [panelClass] });
  });

  it('should open a snack bar with a link', () => {
    const message = 'Test message';
    const panelClass = 'test-panel-class';
    const linkText = 'Test link';
    const linkUrl = '/test-url';
    component.openSnackBarWithLink(message, panelClass, linkText, linkUrl);
    expect(snackBarSpy.open).toHaveBeenCalledWith(message, linkText, { duration: 5000, panelClass: panelClass });
  });

  it('should load recipes for my recipes', () => {
    const destroySubject = new Subject<void>();
    component['destroy$'] = destroySubject;
  
     // Mock localStorage.getItem('loggedInUserId') to return a user ID
     const userId = 'user123';
     localStorage['__proto__'].getItem = jest.fn().mockReturnValue(userId);
  
    const recipes = [{ id: 1 }, { id: 2 }];
    recipesServiceSpy.getmyRecipe.mockReturnValue(of(recipes));
  
    // Set isMyRecipes to true
    component.isMyRecipes = true;
  
    // Call loadrecipes method
    component.loadrecipes();
  
    expect(recipesServiceSpy.getmyRecipe).toHaveBeenCalledWith(userId);
    expect(component.recipesData).toEqual(recipes);
    expect(recipesServiceSpy.getmyRecipe.mock.calls[0][0]).toBe(userId);
    expect(recipesServiceSpy.getmyRecipe.mock.calls[0][1]).toBeUndefined();
    expect(component['destroy$']).toBe(destroySubject);
  });
  
  

it('should load all recipes', () => {
    const destroySubject = new Subject<void>();
    component['destroy$'] = destroySubject;

    const recipes = [{ id: 1 }, { id: 2 }];
    recipesServiceSpy.getRecipes.mockReturnValue(of(recipes));
    
    // Mock localStorage.getItem('loggedInUserId') to return a user ID
    const userId = 'user123';
    localStorage['__proto__'].getItem = jest.fn().mockReturnValue(userId);

    component.loadrecipes();

    // Should get all recipes
    expect(recipesServiceSpy.getRecipes).toHaveBeenCalled();
    // Should update recipesData with the fetched recipes
    expect(component.recipesData).toEqual(recipes);
    // Should apply takeUntil operator with the correct destroy$ subject
    expect(component['destroy$']).toBe(destroySubject);
});

  it('should handle error when loading recipes', () => {
    const destroySubject = new Subject<void>();
    component['destroy$'] = destroySubject;

    const error = new Error('Test error');
    recipesServiceSpy.getRecipes.mockReturnValue(throwError(error));

    console.error = jest.fn(); // Mock console.error
    

    component.loadrecipes();
    
    // Should log the error
    expect(console.error).toHaveBeenCalledWith('Error loading recipes:', error); 
    // recipesData should remain unchanged
    expect(component.recipesData).toEqual([]);
     // Should apply takeUntil operator with the correct destroy$ subject
    expect(component['destroy$']).toBe(destroySubject);
  });

  // it('should navigate to recipe detail on calling ViewRecipe', () => {
  //   const recipeid = 123;
  
  //   // Mock recipesServiceSpy.getRecipes to return a successful observable
  //   recipesServiceSpy.getRecipes.mockReturnValue(of([{ id: 123 }]));
  
  //   // Create a spy for the navigate function
  //   const navigateSpy = jest.spyOn(component['router'], 'navigate');
  
  //   // Call the ViewRecipe method
  //   component.ViewRecipe(recipeid);
  
  //   // Expect that navigateSpy is called with the expected parameters
  //   expect(navigateSpy).toHaveBeenCalledWith(['/features/recipedetail/', recipeid]);
  // });

  it('should add recipe to favorites if user is logged in', () => {
    const userId = 'user123';
    localStorage.setItem('loggedInUserId', userId); // Mock logged-in user

    const recipeData = {
      id: 1,
      title: 'Test Recipe',
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      instructions: 'Test instructions',
      recipePicture: 'test.jpg',
      category: 'Test category',
      time: 'Test time'
    };

    // Mock successful addToFavorites call
    recipesServiceSpy.addToFavorites.mockReturnValue(of(null));

    // Call the addToFavorites method
    component.addToFavorites(recipeData);

    // Expect that addToFavorites was called with the correct data
    expect(recipesServiceSpy.addToFavorites).toHaveBeenCalledWith({
      id: recipeData.id,
      title: recipeData.title,
      ingredients: recipeData.ingredients,
      instructions: recipeData.instructions,
      recipePicture: recipeData.recipePicture,
      category: recipeData.category,
      time: recipeData.time,
      userId: userId
    });
  })

  // it('should display error message if user is not logged in', () => {
  //   // Mock user not logged in
  //   localStorage.removeItem('loggedInUserId'); 
  
  //   // Call the addToFavorites method
  //   component.addToFavorites({});

  
  //   // Expect that addToFavorites was not called
  //   expect(recipesServiceSpy.addToFavorites).not.toHaveBeenCalled();
  // });

  it('should open edit recipe dialog and refresh recipes data', () => {
    // Mock recipe ID
    const recipeId = 123;
    jest.spyOn(component, 'loadrecipes').mockImplementation(() => {});
    
    // Spy on MatDialog open method
    const openSpy = jest.spyOn(matDialog, 'open').mockReturnValue({
      afterClosed: () => of(true) // Mock the afterClosed method to return an Observable
    } as any);
  
    // Call the editRecipe method
    component.editRecipe(recipeId);
  
    // Expect that MatDialog open method is called with the correct parameters
    expect(openSpy).toHaveBeenCalledWith(RecipemanagementComponent, {
      width: '550px',
      disableClose: true,
      data: { recipeid: recipeId }
    });
  
    // Expect that loadrecipes method is called after editing the recipe
    expect(component.loadrecipes).toHaveBeenCalled();
  });
  
  
  

afterEach(() => {
  jest.clearAllMocks();
});
});
