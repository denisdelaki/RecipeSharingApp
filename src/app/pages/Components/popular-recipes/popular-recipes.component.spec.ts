import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopularRecipesComponent } from './popular-recipes.component';

describe('PopularRecipesComponent', () => {
  let component: PopularRecipesComponent;
  let fixture: ComponentFixture<PopularRecipesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PopularRecipesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopularRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
