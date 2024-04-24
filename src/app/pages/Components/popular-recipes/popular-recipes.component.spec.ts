import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { PopularRecipesComponent } from './popular-recipes.component';
import { RecipesService } from '../../../features/Services/recipes.service';
import { of } from 'rxjs';
import { Router } from '@angular/router';

describe('PopularRecipesComponent', () => {
  let component: PopularRecipesComponent;
  let fixture: ComponentFixture<PopularRecipesComponent>;
  let recipesService: RecipesService;
  let router: Router;
  
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularRecipesComponent],
      imports: [HttpClientModule, ],
      providers: [RecipesService,
        { provide: Router, useValue: { navigate: jest.fn() } },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PopularRecipesComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    recipesService = TestBed.inject(RecipesService); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch recipes', () => {
    // Arrange
    const recipes = [{ id: 1, name: 'Recipe 1' }, { id: 2, name: 'Recipe 2' }];
    jest.spyOn(recipesService, 'getRecommendedRecipes').mockReturnValue(of(recipes));

    // Act
    component.fetchRecipes();

    // Assert
    expect(component.recipesData).toEqual(recipes);
    expect(recipesService.getRecommendedRecipes).toHaveBeenCalled();
    expect(recipesService.getRecommendedRecipes).toHaveBeenCalledTimes(1);
  });

  it('should view recipe', () => {
    const recipeId = 123;
    component.viewrecipe(recipeId);
    expect(router.navigate).toHaveBeenCalledWith(['/features/recipedetail/', recipeId]);
  })

});