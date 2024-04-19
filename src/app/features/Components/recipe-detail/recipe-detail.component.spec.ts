///test cases 
// ###should create:
// - Create TestBed configuration for RecipeDetailComponent.
// - Create component fixture.
// - Inject necessary services and components.
// - Expect the component to be truthy.

// ###should fetch recipe data when recipeId is provided:
// - Mock the return value of recipesService.getRecipes to simulate fetching recipe data.
// - Call ngOnInit method of the component.
// - Expect recipesService.getRecipes to have been called with the provided recipeId.
// - Expect the component's recipe property to equal the expected recipe data.

// ###should call fetchRecipeData with the correct recipeId on initialization:
// - Spy on the fetchRecipeData method of the component.
// - Call ngOnInit method of the component.
// - Expect fetchRecipeData method to have been called with the correct recipeId.

// should successfully recommend a recipe to the user:
// - Mock the return value of localStorage.getItem to simulate a logged-in user.
// - Mock the return value of recipesService.recommend to simulate a successful recommendation.
// - Spy on the openSnackBar method of the component.
// - Call the recommend method of the component with mock recipe data.
// - Expect localStorage.getItem to have been called with the correct parameter.
// - Expect recipesService.recommend to have been called with the correct recipe data.
// - Expect openSnackBar method to have been called with the expected success message and notification type.


import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipesService } from '../../Services/recipes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar, MatSnackBarRef, TextOnlySnackBar} from '@angular/material/snack-bar';
import {  of } from 'rxjs';

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;
  let recipesService: RecipesService;
  let activatedRoute: ActivatedRoute;
  let httpTestingController: HttpTestingController;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      declarations: [ RecipeDetailComponent ],
      providers: [ RecipesService,
         { provide: ActivatedRoute, useValue: { params: of({ id: '123' }) } }, 
         {
          provide: MatSnackBar,
          useValue: {
            open: (message: string, action: string, config: any) => {
              return {
                afterDismissed: () => of(null),
                dismiss: () => { }
              } as unknown as MatSnackBarRef<TextOnlySnackBar>;
            }
          }
        },
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    recipesService = TestBed.inject(RecipesService);
    activatedRoute = TestBed.inject(ActivatedRoute);
    httpTestingController = TestBed.inject(HttpTestingController);
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch recipe data when recipeId is provided', () => {
    jest.spyOn(recipesService, 'getRecipes').mockReturnValue(of({ id: '123', title: 'Test Recipe' }));
    component.ngOnInit();
    expect(recipesService.getRecipes).toHaveBeenCalledWith('123');
    expect(component.recipe).toEqual({ id: '123', title: 'Test Recipe' });
  });
  
  it('should call fetchRecipeData with the correct recipeId on initialization', () => {
    jest.spyOn(component, 'fetchRecipeData');
    component.ngOnInit();
    expect(component.fetchRecipeData).toHaveBeenCalledWith('123');
  });

  it('should successfully recommend a recipe to the user', () => {
    const userId = 'test-user-id';
    const recipedata = {
      title: 'test recipe',
      ingredients: [],
      instructions: [],
      recipePicture: '',
      category: '',
      time: 0,
      userId: userId,
    };
  
    // Mocking localStorage
    jest.spyOn(localStorage['__proto__'], 'getItem').mockReturnValue(userId);
  
    jest.spyOn(recipesService, 'recommend').mockReturnValue(of(null));
  
    // Spy on openSnackBar method
    const openSnackBarSpy = jest.spyOn(component, 'openSnackBar');
  
    // Call recommend method
    component.recommend(recipedata);
  
    // Expectations
    expect(localStorage.getItem).toHaveBeenCalledWith('loggedInUserId');
    expect(recipesService.recommend).toHaveBeenCalledWith({
      title: 'test recipe',
      ingredients: [],
      instructions: [],
      recipePicture: '',
      category: '',
      time: 0,
      userId: userId,
    });
    expect(openSnackBarSpy).toHaveBeenCalledWith('Recipe Recommended successfully', 'success-notification');
  });
  
});