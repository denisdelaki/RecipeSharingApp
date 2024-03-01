import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewRecipeComponentComponent } from './view-recipe-component.component';

describe('ViewRecipeComponentComponent', () => {
  let component: ViewRecipeComponentComponent;
  let fixture: ComponentFixture<ViewRecipeComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ViewRecipeComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewRecipeComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
