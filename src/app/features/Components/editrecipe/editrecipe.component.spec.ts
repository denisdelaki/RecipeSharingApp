import { TestBed, ComponentFixture, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditrecipeComponent } from './editrecipe.component';
import { RecipesService } from '../../Services/recipes.service';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; 
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';

describe('EditrecipeComponent', () => {
  let component: EditrecipeComponent;
  let fixture: ComponentFixture<EditrecipeComponent>;
  let mockMatDialogRef: Partial<MatDialogRef<EditrecipeComponent>>;
  let mockMatSnackBar: Partial<MatSnackBar>;
  let mockRecipesService: Partial<RecipesService>;
  let mockRouter: Partial<Router>;

  beforeEach(waitForAsync(() => {
    mockMatDialogRef = {
      close: jest.fn()
    };

    mockMatSnackBar = {
      open: jest.fn()
    };

    mockRecipesService = {
      getRecipes: jest.fn(() => of({})),
      editRecipe: jest.fn(() => of({ success: true }))
    };

    mockRouter = {
      navigate: jest.fn()
    };

      TestBed.configureTestingModule({
        declarations: [EditrecipeComponent],
        imports: [
          MatDialogModule,
          HttpClientModule,
          NoopAnimationsModule 
        ],
        providers: [
          { provide: MatDialogRef, useValue: mockMatDialogRef },
          { provide: MAT_DIALOG_DATA, useValue: {} },
          { provide: MatSnackBar, useValue: mockMatSnackBar },
          { provide: RecipesService, useValue: mockRecipesService },
          { provide: Router, useValue: mockRouter }
        ]
      }).compileComponents();
      fixture = TestBed.createComponent(EditrecipeComponent);
      component = fixture.componentInstance;
      fixture.detectChanges();
    })
  );

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should call close() on MatDialogRef when close() is called', () => {
    // Act
    component.close();

    // Assert
    expect(mockMatDialogRef.close).toHaveBeenCalled();
  });
  it('should contain categories', () => {
    // Assert
    expect(component.Categorys).toBeTruthy();
  })

  it('should call openSnackBar() on MatSnackBar when openSnackBar() is called', () => {
    // Act
    component.openSnackBar('Test message', 'panel-class');

    // Assert
    expect(mockMatSnackBar.open).toHaveBeenCalledWith('Test message', 'Close', { duration: 1000, panelClass: ['panel-class'] });
    expect(mockMatSnackBar.open).toHaveBeenCalledTimes(2);
  })

  //fetch the data from the service and diaplay to th e user by first checking the recipe id that has been selected for editting
  it('should load recipe data when recipeid is provided', () => {
    // Arrange
    const formBuilder = TestBed.inject(FormBuilder);
    const mockRecipeId = 123;
    const mockRecipeData = {
      title: 'Test Recipe',
      ingredients: [{ ingredient: 'Ingredient 1' }, { ingredient: 'Ingredient 2' }],
      instructions: [{ instruction: 'Step 1' }, { instruction: 'Step 2' }],
      recipePicture: 'https://example.com/recipe.jpg',
      category: 'BreakFast',
      time: '30 mins'
    };
    // Create a mock for patchValue
    const mockFormGroup = formBuilder.group({}); 
    const patchValueSpy = jest.spyOn(mockFormGroup, 'patchValue');
    component.editrecipe = mockFormGroup as FormGroup;
    component.data = { recipeid: mockRecipeId };
    jest.spyOn(mockRecipesService, 'getRecipes').mockReturnValue(of(mockRecipeData));  
    // Act
    component.ngOnInit();
  
    // Assert
    expect(mockRecipesService.getRecipes).toHaveBeenCalledWith(mockRecipeId);
    expect(patchValueSpy).toHaveBeenCalledWith({
      title: mockRecipeData.title,
      ingredients: ['Ingredient 1', 'Ingredient 2'],
      instructions: ['Step 1', 'Step 2'],
      recipePicture: mockRecipeData.recipePicture,
      category: mockRecipeData.category,
      time: mockRecipeData.time
    });
  });

  it('should call editRecipe and close dialog on valid form submission', () => {
    // Set up form data
    component.editrecipe.setValue({
      title: 'Test Recipe',
      ingredients: ['Ingredient1', 'Ingredient2'],
      instructions: ['Step1', 'Step2'],
      recipePicture: 'http://example.com/image.jpg',
      category: 'Dinner',
      time: '20 mins'
    });
  
    // Create a spy on the editRecipe method of the RecipesService mock
    const editRecipeSpy = jest.spyOn(mockRecipesService, 'editRecipe').mockReturnValue(of({ success: true }));
  
    // Act
    component.edit();
  
    // Assert
    expect(mockRecipesService.editRecipe).toHaveBeenCalledWith(component.data.recipeid, component.editrecipe.value);
    expect(mockMatDialogRef.close).toHaveBeenCalled();
    expect(mockMatSnackBar.open).toHaveBeenCalledWith('Recipe updated successfully', 'Close', { duration: 1000, panelClass: ['success-notification'] })
    // expect(mockMatSnackBar.open).toHaveBeenCalledWith('Recipe updated successfully', 'success-notification');
  
    // Ensure the error message is not displayed
    expect(mockMatSnackBar.open).not.toHaveBeenCalledWith('Error fetching the recipe data', 'error-notification');
  
    // Restore the editRecipe method to its original implementation
    editRecipeSpy.mockRestore();
  });
  

  
});
