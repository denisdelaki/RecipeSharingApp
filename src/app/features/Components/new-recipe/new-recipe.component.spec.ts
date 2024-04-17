import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { NewRecipeComponent } from './new-recipe.component';
import { RecipesService } from '../../Services/recipes.service';

describe('NewRecipeComponent', () => {
  let component: NewRecipeComponent;
  let fixture: ComponentFixture<NewRecipeComponent>;
  let service: RecipesService; 

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewRecipeComponent],
      imports: [MatDialogModule, HttpClientModule], 
      
      providers: [
        RecipesService, 
        { provide: MatDialogRef, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewRecipeComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(RecipesService); 
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});