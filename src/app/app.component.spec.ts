import { TestBed, ComponentFixture } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [HttpClientModule]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'RecipeSharingApp'`, () => {
    expect(component.title).toEqual('RecipeSharingApp');
  });

  it('should log isSignup change', () => {
    const spy = jest.spyOn(console, 'log');
    component.onIsSignupChange(true);
    expect(spy).toHaveBeenCalledWith('isSignup changed:', true);
  })

});