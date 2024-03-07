import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { EditRecipeComponent } from './edit-recipe.component';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipesService } from '../../core/recipes.service';
import { of } from 'rxjs';

describe('EditRecipeComponent', () => {
  let component: EditRecipeComponent;
  let fixture: ComponentFixture<EditRecipeComponent>;
  let mockFormBuilder: Partial<FormBuilder>;
  let mockRecipeService: Partial<RecipesService>;
  let mockSnackBar: Partial<MatSnackBar>;
  let mockActivatedRoute: Partial<ActivatedRoute>;
  let mockRouter: Partial<Router>;

  beforeEach(waitForAsync(() => {
    mockFormBuilder = {
      group: jest.fn(() => ({
        value: {
          title: '',
          category: '',
          ingredients: '',
          instruction: '',
          recipimgurl: ''
        },
        patchValue: jest.fn(),
        markAsDirty: jest.fn()
      })) as any
    };

    mockRecipeService = {
      getData: jest.fn().mockReturnValue(of({}))
    };

    mockSnackBar = {
      open: jest.fn()
    };

    mockActivatedRoute = {
      params: of({ id: 123 })
    };

    mockRouter = {
      navigate: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [EditRecipeComponent],
      imports: [ReactiveFormsModule],
      providers: [
        { provide: FormBuilder, useValue: mockFormBuilder },
        { provide: RecipesService, useValue: mockRecipeService },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch recipe data on initialization', () => {
    const testData = {
      title: 'Test Title',
      category: 'Test Category',
      ingredients: 'Test Ingredients',
      instruction: 'Test Instruction',
      recipimgurl: 'Test Image URL'
    };
    mockRecipeService.getData = jest.fn().mockReturnValue(of(testData));

    component.ngOnInit();
    expect(mockRecipeService.getData).toHaveBeenCalledWith(123);
    expect(component.editrecipeForm.patchValue).toHaveBeenCalledWith(testData);
  });

  it('should edit recipe successfully when Edit is called with valid form data', () => {
    const testData = {
      title: 'Test Title',
      category: 'Test Category',
      ingredients: 'Test Ingredients',
      instruction: 'Test Instruction',
      recipimgurl: 'Test Image URL'
    };
    const mockForm = (mockFormBuilder as FormBuilder).group({})!; // Corrected line
    component.editrecipeForm = mockForm as any;
    component.recipeId = 123;
    mockRecipeService.editRecipe = jest.fn().mockReturnValue(of('Edit Successful'));

    component.Edit();

    expect(mockRecipeService.editRecipe).toHaveBeenCalledWith(123, expect.objectContaining(testData));
    expect(mockSnackBar.open).toHaveBeenCalledWith('Recipe Editted successfully', 'success-notification');
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/recipes/myrecipe']);
  });

  it('should navigate to my recipes when close is called', () => {
    component.close();
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/recipes/myRecipes']);
  });
});
