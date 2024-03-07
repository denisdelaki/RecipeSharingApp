import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllRecipesComponent } from './all-recipes.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, of, BehaviorSubject } from 'rxjs';
import { takeUntil, delay } from 'rxjs/operators';
import { RecipesService } from '../../core/recipes.service';

describe('AllRecipesComponent', () => {
  let component: AllRecipesComponent;
  let fixture: ComponentFixture<AllRecipesComponent>;
  let router: Router;
  let recipesService: RecipesService;
  let formBuilder: FormBuilder;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AllRecipesComponent],
      providers: [
        { provide: Router, useValue: { navigate: jest.fn() } },
        {
          provide: RecipesService,
          useValue: {
            getData: jest.fn().mockReturnValue(of([])),
            searchData$: new BehaviorSubject<any[]>([]),
            showSearchResults$: new BehaviorSubject<boolean>(false)
          }
        },
        FormBuilder
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllRecipesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    recipesService = TestBed.inject(RecipesService);
    formBuilder = TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getData on ngOnInit and set recipeData', () => {
    const mockData = [{ id: 1, name: 'Recipe 1' }, { id: 2, name: 'Recipe 2' }];
    jest.spyOn(recipesService, 'getData').mockReturnValue(of(mockData));

    component.ngOnInit();

    expect(recipesService.getData).toHaveBeenCalled();
    expect(component.recipeData).toEqual(mockData);
  });

  it('should navigate to landing page on Logout', () => {
    component.Logout();

    expect(router.navigate).toHaveBeenCalledWith(['/landingpage']);
  });

  it('should navigate to recipe page on ViewRecipe', () => {
    const recipeId = 123;
    component.ViewRecipe(recipeId);

    expect(router.navigate).toHaveBeenCalledWith(['/recipe', recipeId]);
  });

  it('should set SearchedRecipes and showSearchResults on searchData$ emission', () => {
    const mockData = [{ id: 1, name: 'Recipe 1' }, { id: 2, name: 'Recipe 2' }];
    component.SearchedRecipes = [];
    jest.spyOn(recipesService.searchData$, 'pipe').mockReturnValue(of(mockData));
    jest.spyOn(recipesService.showSearchResults$, 'pipe').mockReturnValue(of(true));

    component.ngOnInit();

    expect(component.SearchedRecipes).toEqual(mockData);
    expect(component.showSearchResults).toBeTruthy();
  });

});
