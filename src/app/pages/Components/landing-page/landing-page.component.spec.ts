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
});
