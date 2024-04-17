import { TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { RecipesService } from './recipes.service';

describe('RecipesService', () => {
  let service: RecipesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule], 
      providers: [RecipesService]
    })
    .compileComponents();
  });

  beforeEach(() => {
    service = TestBed.inject(RecipesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });


});