///Tests
//    Test suite: LoginComponent
//    - Test case: should create
//      - Description: Verifies that the LoginComponent is created successfully.
//      - Expectation: The component should be truthy.

//    - Test case: should have invalid form on initialization
//      - Description: Verifies that the form is invalid when the component is initialized.
//      - Expectation: The 'valid' property of the form should be falsy.

//    - Test case: should have valid form when valid email and password are entered
//      - Description: Verifies that the form becomes valid when a valid email and password are entered.
//      - Expectation: The 'valid' property of the form should be truthy after setting valid email and password.

//    - Test case: should log in user with correct credentials
//      - Description: Verifies that the user is logged in with correct credentials.
//      - Setup: Mocks UserService to return mock user data.
//               Mocks Router's navigateByUrl method to resolve successfully.
//               Sets valid email and password in the component.
//      - Expectation: Router's navigateByUrl method should be called with '/recipes/myprofile'.
//                     AuthService's login method should be called.

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientModule } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../core/user.service';
import { AuthService } from '../auth.service';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { of } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let userService: jest.Mocked<UserService>;
  let authService: jest.Mocked<AuthService>;

  beforeEach(waitForAsync(() => {
    const userServiceSpy = {
      getData: jest.fn()
    };
    const authServiceSpy = {
      login: jest.fn()
    };

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      imports: [
        ReactiveFormsModule,
        HttpClientModule,
        RouterTestingModule
      ],
      providers: [
        FormBuilder,
        MatSnackBar,
        { provide: UserService, useValue: userServiceSpy },
        { provide: AuthService, useValue: authServiceSpy }
      ]
    }).compileComponents();

    userService = TestBed.inject(UserService) as jest.Mocked<UserService>;
    authService = TestBed.inject(AuthService) as jest.Mocked<AuthService>;
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have invalid form on initialization', () => {
    expect(component.options.valid).toBeFalsy();
  });

  it('should have valid form when valid email and password are entered', () => {
    const email = component.options.controls['email'];
    const password = component.options.controls['password'];
    email.setValue('test@example.com');
    password.setValue('password123');
    expect(component.options.valid).toBeTruthy();
  });
  
  it('should log in user with correct credentials', async () => {
    userService.getData.mockReturnValue(of([{ email: 'test@example.com', password: 'password123', id: '1' }]));
    const routerNavigateByUrlSpy = jest.spyOn(TestBed.inject(Router), 'navigateByUrl').mockResolvedValue(true);
    component.options.controls['email'].setValue('test@example.com');
    component.options.controls['password'].setValue('password123');
    component.onSubmit();
    await fixture.whenStable();
    expect(routerNavigateByUrlSpy).toHaveBeenCalledWith('/recipes/myprofile');
    expect(authService.login).toHaveBeenCalled();
  });
});
