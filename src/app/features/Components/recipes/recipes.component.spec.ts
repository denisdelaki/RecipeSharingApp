import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipesComponent } from './recipes.component';
import { RecipesService } from '../../Services/recipes.service';
import { of, Subject, throwError } from 'rxjs';

describe('RecipesComponent', () => {
  let component: RecipesComponent;
  let fixture: ComponentFixture<RecipesComponent>;
  let snackBarSpy: jest.Mocked<MatSnackBar>;
  let recipesServiceSpy: jest.Mocked<RecipesService>;

  beforeEach(waitForAsync(() => {
    snackBarSpy = {
      open: jest.fn().mockReturnValue({ onAction: jest.fn().mockReturnValue(of(null)) }),
      openFromComponent: jest.fn()
    } as unknown as jest.Mocked<MatSnackBar>;

    recipesServiceSpy = {
      getmyRecipe: jest.fn(),
      getRecipes: jest.fn().mockReturnValue(of([])) 
    } as unknown as jest.Mocked<RecipesService>;

    TestBed.configureTestingModule({
      declarations: [RecipesComponent],
      imports: [MatDialogModule, HttpClientModule, RouterTestingModule],
      providers: [
        { provide: MatSnackBar, useValue: snackBarSpy },
        { provide: RecipesService, useValue: recipesServiceSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipesComponent);
    component = fixture.componentInstance;
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
    jest.spyOn(localStorage, 'getItem').mockImplementation(() => userId);
  
    const recipes = [{ id: 1 }, { id: 2 }];
    recipesServiceSpy.getmyRecipe.mockReturnValue(of(recipes));
  
    // Set isMyRecipes to true
    component.isMyRecipes = true;
  
    // Call loadrecipes method
    component.loadrecipes();
  
    // expect(recipesServiceSpy.getmyRecipe).toHaveBeenCalledWith(userId);
    // expect(component.recipesData).toEqual(recipes);
    expect(recipesServiceSpy.getmyRecipe.mock.calls[0][0]).toBe(userId);
    expect(recipesServiceSpy.getmyRecipe.mock.calls[0][1]).toBeUndefined();
    expect(component['destroy$']).toBe(destroySubject);
  });
  
  

  it('should load all recipes', () => {
    const destroySubject = new Subject<void>();
    component['destroy$'] = destroySubject;

    const recipes = [{ id: 1 }, { id: 2 }];
    recipesServiceSpy.getRecipes.mockReturnValue(of(recipes));
    
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

  afterEach(() => {
    jest.clearAllMocks();
  });
});
