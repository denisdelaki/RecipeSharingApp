import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import {  HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NewRecipeComponent } from './new-recipe.component';
import { RecipesService } from '../../Services/recipes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormArray, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

describe('NewRecipeComponent', () => {
  let component: NewRecipeComponent;
  let fixture: ComponentFixture<NewRecipeComponent>;
  let service: RecipesService; 
  let snackBar: MatSnackBar;
  let httpMock: HttpTestingController;
  let dialogRefMock: Partial<MatDialogRef<NewRecipeComponent>>;
  let formBuilder: FormBuilder;
  
  beforeEach(async () => {
    formBuilder = new FormBuilder();
    dialogRefMock = {
      close: jest.fn() 
    };

    await TestBed.configureTestingModule({
      declarations: [NewRecipeComponent],
      imports: [MatDialogModule, HttpClientModule, NoopAnimationsModule, HttpClientTestingModule], 
      providers: [
        FormBuilder,
        RecipesService, 
        MatSnackBar,
         { provide: MatDialogRef, useValue: dialogRefMock }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRecipeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RecipesService); 
    snackBar = TestBed.inject(MatSnackBar);
    httpMock = TestBed.inject(HttpTestingController);
    formBuilder=TestBed.inject(FormBuilder);
    fixture.detectChanges();
  });

  afterEach(() => {
    httpMock.verify(); 
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should open snack bar with correct message and panel class', () => {
    jest.spyOn(snackBar, 'open');
    component.openSnackBar('Test message', 'test-panel-class');
    expect(snackBar.open).toHaveBeenCalledWith('Test message', 'Close', {
      duration: 1000,
      panelClass: ['test-panel-class']
    });
  });

  it('should add a new ingredient form', () => {
    // Call the method to add a new ingredient form
    component.addIngredient(); 
    // Check if a new form was added
    expect(component.ingredientForms.length).toBe(2); 
  });
  
  it('should remove an ingredient form', () => {
    // Push a new ingredient form to the array using formBuilder
    component.ingredientForms.push(formBuilder.control(''));
    // Call the method to remove the form at index 0
    component.removeIngredient(0); 
    // Check if the form was removed
    expect(component.ingredientForms.length).toBe(1); 
  });  

  it('should add a new instruction form', () => {
    // Call the method to add a new instruction form
    component.addInstruction(); 
     // Check if a new form was added
    expect(component.instructionForms.length).toBe(2);
  });
  
  it('should remove an instruction form', () => {
    // Push a new instruction form to the array using formBuilder
    component.instructionForms.push(formBuilder.control(''));
    // Call the method to remove the form at index 0
    component.removeInstruction(0); 
     // Check if the form was removed
    expect(component.instructionForms.length).toBe(1);
  });
  
  it('should return instructionForms', () => {
    // Ensure instructionForms returns the correct value
    expect(component.instructionForms).toEqual(component.AddRecipe.get('instructions') as FormArray);
  });
  
  // it('should add a recipe and close the dialog when form is valid', () => {
  //   const mockFormValue = {
  //     title: 'Test Recipe',
  //     ingredients: ['Ingredient 1', 'Ingredient 2'],
  //     instructions: ['Instruction 1', 'Instruction 2'],
  //     time: 30,
  //     recipePicture: 'https://example.com/recipe.jpg',
  //     category: 'BreakFast'
  //   };
  
  //   const mockResponse = {
  //     title: 'Test Recipe',
  //     ingredients: [{ ingredient: 'Ingredient 1' }, { ingredient: 'Ingredient 2' }],
  //     instructions: [{ instruction: 'Instruction 1' }, { instruction: 'Instruction 2' }],
  //     time: 30,
  //     recipeUrl: 'https://example.com/recipe',
  //     category: 'BreakFast',
  //     userId: 'test-user-id'
  //   };
  
  //   jest.spyOn(service, 'createRecipes').mockReturnValue(of(mockResponse));
  //   const openSnackBarSpy = jest.spyOn(component, 'openSnackBar');
  
  //   component.AddRecipe.patchValue(mockFormValue);
  //   component.add();
  
  //   expect(service.createRecipes).toHaveBeenCalledWith({
  //     ...mockFormValue,
  //     // Use expect.any(String) for flexible userId matching
  //     userId: expect.any(String) 
  //   });
  
  //   expect(component.recipesdata.length).toBe(1);
  //   expect(component.recipesdata[0]).toEqual(mockResponse);
  //   expect(openSnackBarSpy).toHaveBeenCalledWith('Recipe created successfully', 'success-notification');
  //   expect(dialogRefMock.close).toHaveBeenCalled();
  // });
  
  
});
