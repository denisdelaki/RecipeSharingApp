////tests cases
// Test: Ensure that the component is created successfully
// ###shouldCreateComponent:
//######   Create TestBed configuration for AuthComponent
//######   Create component fixture
//######   Inject necessary services and components
//######   Expect component to be truthy

//  Test: Verify that the snackbar opens with the specified message and panel class
//##### shouldOpenSnackbar:
//#####   Call openSnackBar method with specified message and panel class
//#####   Expect snackBar's open method to have been called with provided arguments

// // Test: Confirm that clicking the register button triggers a click event
//####   shouldTriggerClickEventOnRegisterButton:
//####   Find register button in debug element
//####   Trigger click event on register button
//####   Trigger change detection to update the view

// // Test: Verify that clicking the login button calls the login method
//####   shouldCallLoginMethodOnClick:
//####   Spy on the login method of the component
//####   Find the login button in the debug element
//####   Trigger a click event on the login button
//####   Expect the login method to have been called

// // Test: Ensure that user registration doesn't occur if the form is invalid
//#### shouldNotRegisterUserIfFormIsInvalid:
//####   Spy on the signup method
//####   Set form controls to invalid values
//####   Trigger registration attempt
//####   Expect the signup method not to have been called

// // Test: Confirm that user registration occurs when the form is valid and the signup service returns a successful response
//#### shouldRegisterUserIfFormIsValid:
//####   Spy on the signup method and mock it to return a successful response
//####   Set form controls to valid values
//####   Trigger registration attempt
//####   Expect the signup method to have been called with the correct parameters

// // Test: Verify that the component handles errors appropriately when the signup service returns an error response
//#### shouldHandleErrorFromSignupService:
//####   Spy on the signup method and mock it to return an error response
//####   Set form controls to valid values
//####   Trigger registration attempt
//####   Expect the signup method to have been called with the correct parameters

// // Test: Ensure that the user is logged in if the form is valid and credentials are correct
//####  shouldLoginUserIfCredentialsAreCorrect:
//####   Mock the loginform to be valid
//####   Mock the authService.login method to return an observable with mock data
//####   Spy on the dataTransmitService.transmitIsLoggedIn method
//####   Spy on the router.navigate method
//####   Spy on the openSnackBar method
//####   Call the login method
//####   Expect loginform to be valid
//####   Expect authService.login method to be called with correct parameters
//####   Expect transmitIsLoggedIn method to be called with true
//####   Expect openSnackBar method to be called with success message
//####   Expect router.navigate method to be called with correct route
//####   Expect localStorage to contain correct logged in user ID

import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth.component';
import { By } from '@angular/platform-browser';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { DataTransmitService } from '../../shared/Services/data-transmit.service';
import { AuthService } from '../Services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { of, throwError } from 'rxjs';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;
  let authService: AuthService;
  let dataTransmitService: DataTransmitService;
  let router: Router;
  let snackBar: MatSnackBar;


 beforeEach(async () => {
  await TestBed.configureTestingModule({
    declarations: [ AuthComponent ],
    imports: [ ReactiveFormsModule, MatSnackBarModule, HttpClientModule ],
    providers: [
      AuthService,
      DataTransmitService,
      Router,
      { provide: MatSnackBar, useValue: {open: jest.fn()} },
      {
        provide: FormBuilder,
        useValue: new FormBuilder(),
      },
    ],
  })
  .compileComponents();
});

  ///inject all the dependencies injected into the component through the constructor
  beforeEach(() => {
    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    snackBar = TestBed.inject(MatSnackBar);
    authService = TestBed.inject(AuthService);
    dataTransmitService = TestBed.inject(DataTransmitService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });



  it('should open snackbar with message and panelClass', () => {
    // Call the openSnackBar method of the component with the specified message and panel class
    component.openSnackBar('Test message', 'panel-class');
    
    // Expect that the snackBar's open method has been called with the provided arguments
    expect(snackBar.open).toHaveBeenCalledWith('Test message', 'Close', { duration: 2000, panelClass: ['panel-class'] });
  });
  
  it('should trigger click event on register button', () => {
    // Find the register button in the fixture's debug element
    const button = fixture.debugElement.query(By.css('button'));
    
    // Trigger a click event on the register button
    button.triggerEventHandler('click', null);
    
    // Trigger change detection to update the view
    fixture.detectChanges(); 
  });
  

  it('should call login method when login button is clicked', () => {
    // Spy on the login method of the component
    const loginSpy = jest.spyOn(component, 'login');
    
    // Find the login button in the fixture's debug element
    const button = fixture.debugElement.query(By.css('button'));
    
    // Trigger a click event on the native element of the button
    button.nativeElement.click();
    
    // Expect that the login method has been called
    expect(loginSpy).toHaveBeenCalled();
  });
  
    ///#####signup method test cases###############
  it('should not register a user if the form is not valid', () => {
    // Spy on the signup method
    const signupSpy = jest.spyOn(authService, 'signup');
  
    // Set form controls to invalid values
    component.signupform.controls['email'].setValue('');
    component.signupform.controls['password'].setValue('');
  
    // Trigger registration attempt
    component.registerUser();
  
    // Expect the signup method not to have been called
    expect(signupSpy).not.toHaveBeenCalled();
  });
  

  it('should register a user if the form is valid and the authService.signup returns a successful response', () => {
    // Spy on the signup method
    const signupSpy = jest.spyOn(authService, 'signup').mockReturnValueOnce(of({  }));
  
    // Set form controls to valid values
    component.signupform.controls['email'].setValue('test@example.com');
    component.signupform.controls['password'].setValue('password123');
  
    // Trigger registration attempt
    component.registerUser();
  
    // Expect the signup method to have been called with the correct parameters
    expect(signupSpy).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });
  

  it('should handle an error response from the authService.signup', () => {
    // Spy on the signup method and mock it to return an error
    jest.spyOn(authService, 'signup').mockReturnValueOnce(throwError('Error'));
  
    // Set form controls to valid values
    component.signupform.controls['email'].setValue('test@example.com');
    component.signupform.controls['password'].setValue('password123');
  
    // Trigger registration attempt
    component.registerUser();
  
    // Expect the authService.signup method to have been called with the correct parameters
    expect(authService.signup).toHaveBeenCalledWith({
      email: 'test@example.com',
      password: 'password123',
    });
  });

    //##############login tests cases###############
 it('should login user if form is valid and credentials are correct', () => {
  // Mocking the loginform to be valid
  component.loginform.setValue({ email: 'test@example.com', password: 'password123' });

  // Mocking the authService.login method to return an observable with mock data
  const mockUserData = [{ id: 1, email: 'test@example.com', password: 'password123' }];
  jest.spyOn(authService, 'login').mockReturnValueOnce(of(mockUserData));

  // Mocking the dataTransmitService.transmitIsLoggedIn method
  const transmitIsLoggedInSpy = jest.spyOn(dataTransmitService, 'transmitIsLoggedIn');

  // Mocking the router.navigate method
  const navigateSpy = jest.spyOn(router, 'navigate');

  // Mocking the openSnackBar method
  const openSnackBarSpy = jest.spyOn(component, 'openSnackBar');

  // Calling the login method
  component.login();

  // Expecting the loginform to be valid
  expect(component.loginform.valid).toBe(true);

  // Expecting authService.login method to be called with the correct parameters
  expect(authService.login).toHaveBeenCalled();

  // Expecting transmitIsLoggedIn method to be called with true
  expect(transmitIsLoggedInSpy).toHaveBeenCalledWith(true);

  // Expecting openSnackBar method to be called with success message
  expect(openSnackBarSpy).toHaveBeenCalledWith('Logged in successfully', 'success-notification');

  // Expecting router.navigate method to be called with the correct route
  expect(navigateSpy).toHaveBeenCalledWith(['/features/myprofile']);

  // Expecting localStorage to contain the correct logged in user ID
  expect(localStorage.getItem('loggedInUserId')).toEqual('1');
});
  
  it('should display error message if form is invalid', () => {
    // Mocking the loginform to be invalid
    component.loginform.setValue({ email: '', password: '' });
  
    // Mocking the openSnackBar method
    const openSnackBarSpy = jest.spyOn(component, 'openSnackBar');
  
    // Mocking the authService.login method to return a promise that resolves to an empty array
    const loginSpy = jest.spyOn(authService, 'login').mockReturnValueOnce(of([]));
  
    // Calling the login method
    component.login();
  
    // Expecting the loginform to be invalid
    expect(component.loginform.valid).toBe(false);
  
    // Expecting openSnackBar method to be called with error message
    expect(openSnackBarSpy).toHaveBeenCalledWith('Please fill all the fields', 'error-notification');
  
    // Expecting authService.login method not to be called
    expect(loginSpy).not.toHaveBeenCalled();
  });
  
  
  it('should display error message if credentials are incorrect', () => {
    // Mocking the loginform to be valid
    component.loginform.setValue({ email: 'test@example.com', password: 'password123' });
  
    // Mocking the authService.login method to return an observable with empty data
    jest.spyOn(authService, 'login').mockReturnValueOnce(of([]));
  
    // Mocking the openSnackBar method
    const openSnackBarSpy = jest.spyOn(component, 'openSnackBar');
  
    // Calling the login method
    component.login();
  
    // Expecting the loginform to be valid
    expect(component.loginform.valid).toBe(true);
  
    // Expecting openSnackBar method to be called with error message
    expect(openSnackBarSpy).toHaveBeenCalledWith('The User Does not exist', 'error-notification');
  });
  

})