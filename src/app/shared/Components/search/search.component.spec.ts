import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
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

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [HttpClientModule, RouterTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: { url: of([{ path: 'myrecipes' }]) } },
        { provide: Router, useValue: {} },
        { provide: RecipesService, useClass: RecipesService },
        { provide: DataTransmitService, useValue: { setsearchedData: jest.fn() } },
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
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

  it('should search recipes when search term is not empty', () => {
    jest.spyOn(recipesService, 'searchRecipes').mockReturnValue(of([]));
    jest.spyOn(dataTransmitService, 'setsearchedData');

    // Set search term in the form
    component.searchForm.setValue({ search: 'test' });
    // Call the filterData method
    component.filterData();
    // Expect searchRecipes method to have been called
    expect(recipesService.searchRecipes).toHaveBeenCalled();
    // Expect setsearchedData method to have been called
    expect(dataTransmitService.setsearchedData).toHaveBeenCalled();
  });

  it('should reset search when search term is empty', () => {
    // Spy on getRecipes method
    const getRecipesSpy = jest.spyOn(recipesService, 'getRecipes').mockReturnValue(of([]));
  
    // Set empty search term in the form
    component.searchForm.setValue({ search: '' });
    // Call the filterData method
    component.filterData();
    // Expect resetSearch method to have been called
    expect(component.showResetIcon).toBe(false);
    // Expect getRecipes method not to have been called
    expect(getRecipesSpy).not.toHaveBeenCalled();
    // Expect setsearchedData method not to have been called
    expect(dataTransmitService.setsearchedData).not.toHaveBeenCalled();
  });

  it('should call getmyRecipe if isMyRecipes is true', () => {
    const userId = '123';
    localStorage.setItem('loggedInUserId', userId);
    component.isMyRecipes = true;

    jest.spyOn(recipesService, 'getmyRecipe').mockReturnValue(of([]));
    jest.spyOn(dataTransmitService, 'setsearchedData');

    component.loadRecipes();

    expect(recipesService.getmyRecipe).toHaveBeenCalledWith(userId);
    expect(dataTransmitService.setsearchedData).toHaveBeenCalledWith([]);
  });

  it('should call getRecipes if isMyRecipes is false', () => {
    component.isMyRecipes = false;

    jest.spyOn(recipesService, 'getRecipes').mockReturnValue(of([]));
    jest.spyOn(dataTransmitService, 'setsearchedData');

    component.loadRecipes();

    expect(recipesService.getRecipes).toHaveBeenCalled();
    expect(dataTransmitService.setsearchedData).toHaveBeenCalledWith([]);
  });

  it('should reset the search form and reload all recipes', () => {
    // Mock the loadRecipes method
    const loadRecipesSpy = jest.spyOn(component, 'loadRecipes');
  
    // Set search term in the form
    component.searchForm.setValue({ search: 'test' });
  
    // Call the resetSearch method
    component.resetSearch();
  
    // Expect the searchForm value to be patched with an empty string
    expect(component.searchForm.value.search).toEqual('');
  
    // Expect showResetIcon to be set to false
    expect(component.showResetIcon).toBe(false);
  
    // Expect loadRecipes method to have been called
    expect(loadRecipesSpy).toHaveBeenCalled();
  });

  it('should call destroy$ next and complete in ngOnDestroy', () => {
    // Spy on the next and complete methods of the destroy$ subject
    const nextSpy = jest.spyOn((component as any).destroy$, 'next');
    const completeSpy = jest.spyOn((component as any).destroy$, 'complete');
  
    // Call ngOnDestroy
    component.ngOnDestroy();
  
    // Expect the next method of destroy$ to have been called
    expect(nextSpy).toHaveBeenCalled();
  
    // Expect the complete method of destroy$ to have been called
    expect(completeSpy).toHaveBeenCalled();
  });
  
  
  

});
