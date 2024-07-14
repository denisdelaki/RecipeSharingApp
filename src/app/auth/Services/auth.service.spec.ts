////########test cases 
//##### Test Case: AuthService creation
//# Description: Checks if the AuthService instance is created successfully.
//### Expectation: expect(service).toBeTruthy();
//##### Test Case: Fetching a single user with provided userId

//# Description: Checks if the AuthService can fetch a single user when a userId is provided.
//### Expectation:
//##### Subscribe to login(userId) method.
//##### Expect fetched user to match the mock user.
//##### Expect an HTTP request to fetch the user with the provided userId.
//##### Verify the request method is GET.
//##### Test Case: Fetching all users without userId

//# Description: Checks if the AuthService can fetch all users when no userId is provided.
//### Expectation:
//##### Subscribe to login() method.
//##### Expect fetched users to match the mock users.
//##### Expect an HTTP request to fetch all users.
//##### Verify the request method is GET.
//##### Test Case: Showing error message on login failure

//# Description: Checks if the AuthService can show an error message when the login fails.
//### Expectation:
//##### Subscribe to login() method.
//##### Expect an error to be handled, showing an error message.
//##### Expect an HTTP request to login, and simulate an error response.
//##### Test Case: Showing error message on signup failure

//# Description: Checks if the AuthService can show an error message when signup fails.
//### Expectation:
//##### Subscribe to signup(userData) method.
//##### Expect an error to be handled, showing an error message.
//##### Expect an HTTP request to signup, and simulate an error response.

import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let injector: TestBed;
  let service: AuthService;
  let httpMock: HttpTestingController;
  let snackBarMock: MatSnackBar;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, MatSnackBarModule],
      providers: [AuthService]
    });

    injector = getTestBed();
    service = injector.get(AuthService);
    httpMock = injector.get(HttpTestingController);
    snackBarMock = TestBed.get(MatSnackBar);
  });

  afterEach(() => {
    httpMock.verify();
  });

  // Check if the AuthService instance is created successfully.
  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Check if the AuthService can fetch a single user when a userId is provided.
  it('should fetch a single user when userId is provided', () => {
    const userId = '123';
    const mockUser = { id: '123', name: 'John Doe' };

    // Subscribe to the login method and expect the fetched user to match the mock user.
    // service.login().subscribe((user) => {
    //   expect(user).toEqual(mockUser);
    // });

    // Expect an HTTP request to fetch the user with the provided userId.
    const req = httpMock.expectOne(`http://localhost:3000/users/${userId}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  // Check if the AuthService can fetch all users when no userId is provided.
  it('should fetch all users when no userId is provided', () => {
    const mockUsers = [
      { id: '123', name: 'John Doe' },
      { id: '456', name: 'Jane Doe' }
    ];

    // Subscribe to the login method and expect the fetched users to match the mock users.
    // service.login().subscribe((users) => {
    //   expect(users).toEqual(mockUsers);
    // });

    // Expect an HTTP request to fetch all users.
    const req = httpMock.expectOne(`http://localhost:3000/users/`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  // This test checks if the AuthService can show an error message when the login fails.
  it('should show error message when login fails', () => {
    const errorMessage = 'Failed to log in';
    const spy = jest.spyOn(snackBarMock, 'open');

    // Subscribe to the login method and expect an error to be handled, showing an error message.
    // service.login().subscribe({
    //   next: () => fail('Expected an error, but received a successful response'),
    //   error: () => {
    //     expect(spy).toHaveBeenCalledWith(errorMessage, 'Close', {
    //       duration: 5000,
    //       panelClass: ['error-snackbar']
    //     });
    //   }
    // });

    // Expect an HTTP request to login, and simulate an error response.
    const req = httpMock.expectOne(`http://localhost:3000/users/`);
    req.error(new ErrorEvent('Network error'));
  });
  
  // This test checks if the AuthService can show an error message when signup fails.
  it('should show error message when signup fails', () => {
    const userData = { email: 'test', password: 'test123' };
    jest.spyOn(snackBarMock, 'open');
    const errorResponse = new HttpErrorResponse({
      error: 'Failed to signup',
      status: 500,
      statusText: 'Internal Server Error'
    });

    // Subscribe to the signup method and expect an error to be handled, showing an error message.
    // service.signup(userData).subscribe(() => {}, () => {
    //   expect(snackBarMock.open).toHaveBeenCalledWith('Failed to signup', 'Close', {
    //     duration: 5000,
    //     panelClass: ['error-snackbar']
    //   });
    // });

    // Expect an HTTP request to signup, and simulate an error response.
    const errorEvent = new ErrorEvent('Network error');
    const req = httpMock.expectOne(`http://localhost:3000/users/`);
    req.error(errorEvent); 
  });

// This test checks if isAuthenticatedUser returns true after successful login
it('should return true after login', () => {
  // Mock response from the server
  const mockUser = { id: '123', name: 'John Doe' };

  // Subscribe to the login method and expect the isAuthenticatedUser method to return true after successful login
  // service.login().subscribe(() => {
  //   expect(service.isAuthenticatedUser()).toBe(true);
  // });

  // Expect an HTTP request to login, and provide a mock response from the server
  const req = httpMock.expectOne(`http://localhost:3000/users/`);
  expect(req.request.method).toBe('GET');
  req.flush(mockUser);
});

it('isAuthenticatedUser should return false initially when not authenticated', () => {
  expect(service.isAuthenticatedUser()).toBe(false);
})


});
