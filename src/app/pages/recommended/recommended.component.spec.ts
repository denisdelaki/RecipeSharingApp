// Test Case 1: Component Creation
// Describe: Ensure that the component is created successfully.
// Steps:
// Create an instance of the RecommendedComponent.
// Assert that the component is truthy.
// Test Case 2: Fetch Recipes Data on Initialization

// Describe: Ensure that recipes data is fetched correctly when the component is initialized.
// Steps:
// Mock the getData method of the RecipesService to return sample data.
// Call the ngOnInit method of the component.
// Assert that the getData method of the RecipesService is called.
// Assert that the recipes property of the component is equal to the sample data.
// Test Case 3: Navigate to Recipe Details

// Describe: Ensure that the component navigates to the correct recipe details page when viewRecipeDetails method is called.
// Steps:
// Mock the navigate method of the Router.
// Call the viewRecipeDetails method of the component with a sample recipe ID.
// Assert that the navigate method of the Router is called with the correct URL path.

import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { RecommendedComponent } from './recommended.component';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipesService } from '../../core/recipes.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('RecommendedComponent', () => {
  let component: RecommendedComponent;
  let fixture: ComponentFixture<RecommendedComponent>;
  let mockRecipesService: Partial<RecipesService>;
  let mockRouter: Partial<Router>;

  beforeEach(waitForAsync(() => {
    mockRecipesService = {
      getData: jest.fn().mockReturnValue(of([])) 
    };

    mockRouter = {
      navigate: jest.fn() 
    };

    TestBed.configureTestingModule({
      declarations: [RecommendedComponent],
      imports: [RouterTestingModule],
      providers: [
        { provide: RecipesService, useValue: mockRecipesService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch recipes data on initialization', () => {
    const testData = [{ id: 1, name: 'Recipe 1' }, { id: 2, name: 'Recipe 2' }];
    mockRecipesService.getData = jest.fn().mockReturnValue(of(testData));

    component.ngOnInit();
    expect(mockRecipesService.getData).toHaveBeenCalled();
    expect(component.recipes).toEqual(testData);
  });

  it('should navigate to recipe details when viewRecipeDetails is called', () => {
    const recipeId = 1;
    component.viewRecipeDetails(recipeId);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/recipe', recipeId]);
  });
});
