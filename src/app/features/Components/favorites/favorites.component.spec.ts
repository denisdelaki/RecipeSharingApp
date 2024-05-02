import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoritesComponent } from './favorites.component';
import { of, Subject, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { RecipesService } from '../../Services/recipes.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('FavoritesComponent', () => {
  let component: FavoritesComponent;
  let fixture: ComponentFixture<FavoritesComponent>;
  let mockRecipesService: Partial<RecipesService>;
  let mockSnackBar: Partial<MatSnackBar>;
  let mockRouter: Partial<Router>;
  let mockMatDialog: jest.Mocked<MatDialog>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    mockRecipesService = {
      getFavoriteRecipes: jest.fn().mockReturnValue(of([])),
      deleteFavorite: jest.fn().mockReturnValue(of({}))
    };

    mockSnackBar = {
      open: jest.fn()
    };

    mockMatDialog = {
      open: jest.fn()
    } as unknown as jest.Mocked<MatDialog>;

    mockRouter = {
      navigate: jest.fn()
    };
    
    await TestBed.configureTestingModule({
      declarations: [FavoritesComponent],
      providers: [
        { provide: RecipesService, useValue: mockRecipesService },
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: Router, useValue: mockRouter },
        { provide: MatDialog, useValue: mockMatDialog },
        { provide: HttpTestingController, useValue: httpMock },
        { provide: HttpClient, useValue: HttpClient },
      ],
      imports: [HttpClientModule, HttpClientTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(FavoritesComponent);
    component = fixture.componentInstance;
    httpMock = TestBed.inject(HttpTestingController);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  

  it('should navigate to recipe detail', () => {
    const id = '123';
    component.ViewRecipe(id);
    expect(mockRouter.navigate).toHaveBeenCalledWith(['/features/recipedetail/', id]);
  });

  it('should confirm recipe deletion', () => {
    const id = '123';
    // Mock the dialog result to simulate user confirmation
    mockMatDialog.open.mockReturnValue({ afterClosed: () => of(true) } as any);
    component.confirmDelete(id);
    // Ensure that MatDialog.open was called
    expect(mockMatDialog.open).toHaveBeenCalled();
  
    // Simulate the user confirming the deletion
    jest.advanceTimersByTime(0); // Advance timers to resolve the afterClosed observable
  
    // Ensure that deleteFavorite is called after the user confirms
    expect(mockRecipesService.deleteFavorite).toHaveBeenCalledWith(id);
  });
  
  
  

  it('should handle error when deleting recipe', () => {
    const id = '123';
    const errorMessage = 'Error deleting recipe';
    mockRecipesService.deleteFavorite = jest.fn().mockReturnValue(throwError(errorMessage));
    component.deletedRecipeId = id;
    component.deleteRecipe(id);
    // Check that snackBar.open was called once with the correct error message and panel class
    expect(mockSnackBar.open).toHaveBeenCalledTimes(2);
    expect(mockSnackBar.open).toHaveBeenCalledWith(errorMessage, 'Close', expect.objectContaining({
      duration: 2000,
      panelClass: ['error-notification']
    }));
  });
  
  it('should delete recipe', () => {
    const id = '123';
    component.deletedRecipeId = id;
    component.deleteRecipe(id);
    // Check that snackBar.open was called once with the success message and panel class
    expect(mockSnackBar.open).toHaveBeenCalledTimes(1);
    expect(mockSnackBar.open).toHaveBeenCalledWith('Recipe deleted successfully', 'Close', expect.objectContaining({
      duration: 2000,
      panelClass: ['success-notification']
    }));
  });

  it('should call getFavoriteRecipes method of RecipesService', () => {
    const userId = '123';
    const expectedUrl = `http://localhost:3000/api/favorites/${userId}`;
    component.loadFavorites();

    const req = httpMock.expectOne(expectedUrl);
    expect(req.request.method).toBe('GET');

    req.flush({ data: [] });

    expect(component.recipesData.length).toBe(0);

    httpMock.verify();
  });
  
  
  afterEach(() => {
    jest.clearAllMocks();
  });
});
