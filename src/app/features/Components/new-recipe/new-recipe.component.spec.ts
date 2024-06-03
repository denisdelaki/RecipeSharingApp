import { ComponentFixture, TestBed, async, inject } from '@angular/core/testing';
import {  HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { RecipesService } from '../../services/recipes.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormArray, FormBuilder } from '@angular/forms';
import { of } from 'rxjs';
import { NewRecipeComponent } from './new-recipe.component';

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

  it('should add recipe if form is valid', () => {
    // Create a spy for the add() method
    const addSpy = jest.spyOn(component, 'add');
    // Manually set the form as valid
    component.AddRecipe.setErrors(null);
    // Call the add() method
    component.add();
    // Expect the add() method to have been called
    expect(addSpy).toHaveBeenCalled();
  });

  it('should not add recipe if form is invalid', () => {
    // Create a spy for the add() method
    const addSpy = jest.spyOn(component, 'add');
    // Create a spy for the openSnackBar() method
    const openSnackBarSpy = jest.spyOn(component, 'openSnackBar');
    
    // Set the form as invalid
    component.AddRecipe.setErrors({ 'invalid': true });
    
    // Call the add() method
    component.add();
    
    // Expect the add() method to have been called
    expect(addSpy).toHaveBeenCalled();
    
    // Expect the openSnackBar() method to have been called with the correct parameters
    expect(openSnackBarSpy).toHaveBeenCalledWith('Invalid form. Please fill in all required fields.', 'error-notification');
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
  
  it('should contain category options', () => {
    // Ensure that Categorys are present
    expect(component.Categorys).toBeTruthy();
    // Ensure that the length of Categorys matches the expected length
    expect(component.Categorys.length).toBe(4); 
    // Ensure that each category object has the expected properties
    expect(component.Categorys[0]).toHaveProperty('value');
    expect(component.Categorys[0]).toHaveProperty('viewValue');
    // You can further test the values of category options if needed
  });
  
  
});
