import { TestBed, ComponentFixture, waitForAsync, fakeAsync, tick } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EditrecipeComponent } from './editrecipe.component';
import { RecipesService } from '../../Services/recipes.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NoopAnimationsModule } from '@angular/platform-browser/animations'; // Import NoopAnimationsModule
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { of } from 'rxjs';

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
      editRecipe: jest.fn(() => of({}))
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
  
 
  
});
