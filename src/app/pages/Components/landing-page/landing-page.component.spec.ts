//pseudocode for the tests 
// Test Suite: LandingPageComponent

//   Test Case: should create
//     Test: Ensure the component is created successfully
//     Expectation: Component should be truthy

//   Test Suite: SignUp
//     Test Case: should navigate to signup page
//       Test: Trigger SignUp method
//       Expectation: Router should navigate to 'auth/signup'

//   Test Suite: Login
//     Test Case: should navigate to login page
//       Test: Trigger Login method
//       Expectation: Router should navigate to 'auth/login'

//   Test Suite: testimonies
//     Test Case: should load testimonies on component initialization
//       Test: Mock the return value of getData method of TestimonialsService
//             Trigger ngOnInit method of LandingPageComponent
//       Expectation:
//         - getData method of TestimonialsService should have been called
//         - testimonies property of LandingPageComponent should be set to the data returned by getData method


import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingPageComponent } from './landing-page.component';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let fixture: ComponentFixture<LandingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LandingPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LandingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should render card title, description, and button correctly', () => {
    const titleElement = fixture.nativeElement.querySelector('.card-title');
    expect(titleElement.textContent.trim()).toEqual('Save and Share your Favorite Recipe');

    const descriptionElement = fixture.nativeElement.querySelector('.card-text');
    expect(descriptionElement.textContent.trim()).toEqual('Equity Eateries is a web app that allows you to save your favorite recipes and share them.');

    const buttonElement = fixture.nativeElement.querySelector('button');
    expect(buttonElement.textContent.trim()).toEqual('Get Started');
    expect(buttonElement.getAttribute('type')).toEqual('button');
    expect(buttonElement.classList).toContain('btn-primary');
    expect(buttonElement.classList).toContain('btn-block');
    expect(buttonElement.classList).toContain('custom-button');
  });
});
