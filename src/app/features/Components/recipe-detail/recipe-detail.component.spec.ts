import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute, Params } from '@angular/router';
import { RecipeDetailComponent } from './recipe-detail.component';
import { RecipesService } from '../../Services/recipes.service';
import { CommonModule } from '@angular/common'; // Import the CommonModule

describe('RecipeDetailComponent', () => {
  let component: RecipeDetailComponent;
  let fixture: ComponentFixture<RecipeDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule, RouterTestingModule, CommonModule], // Add CommonModule to the imports array
      providers: [
        RecipesService,
        {
          provide: ActivatedRoute,
          useValue: {
            params: {
              subscribe: () => ({
                next: () => ({ id: '123' })
              })
            }
          }
        }
      ] 
       })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecipeDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});