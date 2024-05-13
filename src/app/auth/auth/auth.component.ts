import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';
import { DataTransmitService } from '../../shared/Services/data-transmit.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  //data passage to and from other components 
  @Input() isSignup: boolean = false;

  signupform: FormGroup;
  loginform: FormGroup;
  
constructor(private formBuilder: FormBuilder,
  private authService: AuthService,
  private dataTransmitService: DataTransmitService,
  private router: Router,
  private snackBar: MatSnackBar
  ){
  //signup form initialization
    this.signupform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6),
        //  Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
        ]]
    });


    //login form initialization 
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), 
        // Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)
      ]]
    });
  }
//// snackbar initialization
openSnackBar(message: string, panelClass: string): void {
  this.snackBar.open(message, 'Close', { duration: 2000, panelClass: [panelClass] });
}

ngOnInit(): void {
  // Subscribe to the isSignup$ observable in the shared service
  this.authService.isSignup$.subscribe(isSignup => {
    this.isSignup = isSignup;
  });
  console.log(this.isSignup)
}

//Login event handler
login() {
  if (this.loginform.valid) {
    const userData = {
      email: this.loginform.value.email,
      password: this.loginform.value.password,
    };

    this.authService.login(userData.email, userData.password)
      .subscribe(
        (userCredential) => {
          // Upon successful login, you can directly access the user information from the userCredential
          const loggedInUser = userCredential.user;

          // Store the user ID in local storage
          localStorage.setItem('loggedInUserId', loggedInUser.uid);

          // Emit the isLoggedInChange event
          this.dataTransmitService.transmitIsLoggedIn(true);

          // Open snackbar
          this.openSnackBar('Logged in successfully', 'success-notification');

          // Navigate to the my profile page
          this.router.navigate(['/features/myprofile']);
        },
        (error) => {
          // Handle error
          console.error(error);

          // Check Firebase error codes to determine the type of error
          if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
            this.openSnackBar('Invalid email or password', 'error-notification');
          } else {
            this.openSnackBar('Login failed', 'error-notification');
          }
        }
      );
  } else {
    this.openSnackBar('Please fill all the fields', 'error-notification');
  }
}


//signup event handler 
registerUser() {
  if (this.signupform.valid) {
    const userData = {
      email: this.signupform.value.email,
      password: this.signupform.value.password,
    };

    this.authService.signup(userData.email, userData.password)
      .subscribe(
        (userCredential) => {
          // You can access the user's ID from the userCredential
          const loggedInUserId = userCredential.user.uid;

          // Store the ID in local storage
          localStorage.setItem('loggedInUserId', loggedInUserId);

          // Emit the isLoggedInChange event
          this.dataTransmitService.transmitIsLoggedIn(true);

          this.openSnackBar('Registered successfully', 'success-notification');

          // Navigate to the my profile page
          this.router.navigate(['/features/myprofile']);
        },
        (error) => {
          // Handle error
          console.error(error);

          // Check Firebase error codes to determine the type of error
          if (error.code === 'auth/email-already-in-use') {
            this.openSnackBar('Email is already in use', 'error-notification');
          } else {
            this.openSnackBar('Registration failed', 'error-notification');
          }
        }
      );
  } else {
    this.openSnackBar('Please fill all the fields', 'error-notification');
  }
}

}
