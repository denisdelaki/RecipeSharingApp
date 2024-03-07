//  Test suite: SignupComponent
//    - Test case: should create
//      - Description: Verifies that the SignupComponent is created successfully.
//      - Expectation: The component should be truthy.

//    - Test case: should render username input field
//      - Description: Verifies that the username input field is rendered.
//      - Expectation: The username input field should be present in the rendered HTML.

//    - Test case: should render email input field
//      - Description: Verifies that the email input field is rendered.
//      - Expectation: The email input field should be present in the rendered HTML.

//    - Test case: should render password input field
//      - Description: Verifies that the password input field is rendered.
//      - Expectation: The password input field should be present in the rendered HTML.

//    - Test case: should render password confirmation input field
//      - Description: Verifies that the password confirmation input field is rendered.
//      - Expectation: The password confirmation input field should be present in the rendered HTML.

//    - Test case: should render SignUp button
//      - Description: Verifies that the SignUp button is rendered.
//      - Expectation: The SignUp button should be present in the rendered HTML.

//    - Test case: should render "Already have an account?" message
//      - Description: Verifies that the "Already have an account?" message is rendered.
//      - Expectation: The message should be present in the rendered HTML.

//    - Test case: should render loading message
//      - Description: Verifies that the loading message is rendered when the loading property is true.
//      - Setup Set the loading property of the component to true.
//      - Expectation: The loading message should be present in the rendered HTML.

import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SignupComponent } from './signup.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SignupComponent],
      imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        HttpClientModule,
        BrowserAnimationsModule
      ],
      providers: [FormBuilder]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render username input field', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[name="username"]')).toBeTruthy();
  });

  it('should render email input field', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[name="email"]')).toBeTruthy();
  });

  it('should render password input field', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[name="password"]')).toBeTruthy();
  });

  it('should render password confirmation input field', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('input[name="passwordconfirm"]')).toBeTruthy();
  });

  it('should render SignUp button', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('button').textContent).toContain('SignUp');
  });

  it('should render "Already have an account?" message', () => {
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.footer').textContent).toContain('Already have an account?');
  });

  it('should render loading message', () => {
    component.loading = true;
    fixture.detectChanges();
    const compiled = fixture.nativeElement;
    expect(compiled.querySelector('.loading').textContent).toContain('Loading...');
  });
});
