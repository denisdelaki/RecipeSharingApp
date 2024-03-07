// ///test cases 
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

import { TestBed } from '@angular/core/testing';
import { LandingPageComponent } from './landing-page.component';
import { Router } from '@angular/router';
import { TestimonialsService } from '../Pages_Services/testimonials.service';
import { of } from 'rxjs';

describe('LandingPageComponent', () => {
  let component: LandingPageComponent;
  let router: Router;
  let testimonialsService: jest.Mocked<TestimonialsService>; // Type the mocked service

  beforeEach(() => {
    // Mock TestimonialsService
    const testimonialsServiceMock = {
      getData: jest.fn() 
    };

    TestBed.configureTestingModule({
      providers: [
        LandingPageComponent,
        { provide: Router, useValue: { navigate: jest.fn() } },
        // Provide the mocked service
        { provide: TestimonialsService, useValue: testimonialsServiceMock } 
      ]
    });
    component = TestBed.inject(LandingPageComponent);
    router = TestBed.inject(Router);
    testimonialsService = TestBed.inject(TestimonialsService) as jest.Mocked<TestimonialsService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('SignUp', () => {
    it('should navigate to signup page', () => {
      component.SignUp();
      expect(router.navigate).toHaveBeenCalledWith(['auth/signup']);
    });
  });

  describe('Login', () => {
    it('should navigate to login page', () => {
      component.Login();
      expect(router.navigate).toHaveBeenCalledWith(['auth/login']);
    });
  });

  describe('testimonies', () => {
    it('should load testimonies on component initialization', () => {
      const testimoniesData = [{ text: 'Testimony 1' }, { text: 'Testimony 2' }];

      // Mock the return value of getData method
      testimonialsService.getData.mockReturnValue(of(testimoniesData));

      component.ngOnInit();
      // Check if the getData method was called
      expect(testimonialsService.getData).toHaveBeenCalled();
      // Check if the testimonies property is correctly set
      expect(component.testimonies).toEqual(testimoniesData);
    });
  });

});
