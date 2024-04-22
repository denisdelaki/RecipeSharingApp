import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { SearchComponent } from './search.component';
import { HttpClientModule } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';
import { of, Subject } from 'rxjs';
import { RecipesService } from '../../../features/Services/recipes.service';
import { DataTransmitService } from '../../Services/data-transmit.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let activatedRoute: ActivatedRoute;
  let router: Router;
  let recipesService: RecipesService;
  let dataTransmitService: DataTransmitService;
  let destroy$: Subject<void>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: {
           // Mocking ActivatedRoute's url observable
          url: of([{ path: 'myrecipes' }])
        } },
        { provide: Router, useValue: {} },
        { provide: RecipesService, useClass: RecipesService },
        { provide: DataTransmitService, useValue: { setsearchedData: jest.fn() } },
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    activatedRoute = TestBed.inject(ActivatedRoute);
    router = TestBed.inject(Router);
    recipesService = TestBed.inject(RecipesService);
    dataTransmitService = TestBed.inject(DataTransmitService);
    destroy$ = new Subject<void>();
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
    destroy$.next();
    destroy$.complete();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call filterData on ngOnInit', () => {
    jest.spyOn(component, 'filterData');
    component.ngOnInit();
    expect(component.filterData).toHaveBeenCalled();
  });

  it('should call getmyRecipe if isMyRecipes is true', () => {
    const userId = '123';
    localStorage.setItem('loggedInUserId', userId);
    component.isMyRecipes = true;
    
    const getmyRecipeSpy = jest.spyOn(recipesService, 'getmyRecipe').mockReturnValue(of([]));
    const setsearchedDataSpy = jest.spyOn(dataTransmitService, 'setsearchedData');

    component.loadRecipes();

    expect(getmyRecipeSpy).toHaveBeenCalledWith(userId);
    expect(setsearchedDataSpy).toHaveBeenCalledWith([]);
  });

  it('should call getRecipes if isMyRecipes is false', () => {
    component.isMyRecipes = false;
    
    const getRecipesSpy = jest.spyOn(recipesService, 'getRecipes').mockReturnValue(of([]));
    const setsearchedDataSpy = jest.spyOn(dataTransmitService, 'setsearchedData');

    component.loadRecipes();

    expect(getRecipesSpy).toHaveBeenCalled();
    expect(setsearchedDataSpy).toHaveBeenCalledWith([]);
  });



});
