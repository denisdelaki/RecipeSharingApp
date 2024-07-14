import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RecipemanagementComponent } from './recipemanagement.component';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipesService } from '../../services/recipes.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('RecipemanagementComponent', () => {
  let component: RecipemanagementComponent;
  let fixture: ComponentFixture<RecipemanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecipemanagementComponent],
      imports: [ReactiveFormsModule, RouterTestingModule],
      providers: [
        FormBuilder,
        MatSnackBar,
        {
          provide: MatDialogRef,
          useValue: {}
        },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {}
        },
        {
          provide: RecipesService,
          useValue: {
            getRecipes: () => of({}),
            createRecipes: () => of({}),
            editRecipe: () => of({})
          }
        }
      ]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize recipeForm', () => {
    expect(component.recipeForm).toBeDefined();
  });

  // Test for openSnackBar method
  it('should open snack bar', () => {
    spyOn(component.snackBar, 'open');
    component.openSnackBar('Test Message', 'Test Panel Class');
    expect(component.snackBar.open).toHaveBeenCalledWith('Test Message', 'Close', { duration: 1000, panelClass: ['Test Panel Class'] });
  });

  // Test for ngOnInit method
  it('should initialize with data in edit mode', () => {
    const mockData = { recipeid: '123' };
    jest.spyOn(component.recipesService, 'getRecipes').mockReturnValue(of({
      title: 'Test Title',
      recipePicture: 'Test Picture',
      // category: 'Test Category',
      time: 'Test Time',
      ingredients: [{ ingredient: 'Ingredient 1' }],
      instructions: [{ instruction: 'Instruction 1' }]
    }));
    component.data = mockData;
    component.ngOnInit();
    expect(component.isEditMode).toBeTruthy();
    expect(component.recipeForm.value).toEqual({
      title: 'Test Title',
      recipePicture: 'Test Picture',
      // category: 'Test Category',
      time: 'Test Time',
      ingredients: ['Ingredient 1'],
      instructions: ['Instruction 1']
    });
  });
  

  // Test for save method
  it('should save recipe', () => {
    jest.spyOn(component.snackBar, 'open');
    jest.spyOn(component.recipesService, 'createRecipes').mockReturnValue(of({}));
    component.save();
    expect(component.snackBar.open).toHaveBeenCalledWith('Recipe created successfully', 'success-notification');
  });

  // Test for addIngredient method
  it('should add ingredient', () => {
    component.addIngredient('Test Ingredient');
    expect(component.ingredientForms.length).toBe(1);
  });

  // Test for removeIngredient method
  it('should remove ingredient', () => {
    component.addIngredient('Test Ingredient');
    component.removeIngredient(0);
    expect(component.ingredientForms.length).toBe(0);
  });

  // Test for addInstruction method
  it('should add instruction', () => {
    component.addInstruction('Test Instruction');
    expect(component.instructionForms.length).toBe(1);
  });

  // Test for removeInstruction method
  it('should remove instruction', () => {
    component.addInstruction('Test Instruction');
    component.removeInstruction(0);
    expect(component.instructionForms.length).toBe(0);
  });

  // Test for close method
  it('should close dialog', () => {
    spyOn(component.dialogRef, 'close');
    component.close();
    expect(component.dialogRef.close).toHaveBeenCalled();
  });
});
