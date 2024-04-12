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
  this.snackBar.open(message, 'Close', {
    duration: 2000, 
    panelClass: [panelClass],
  });
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
   console.log(this.loginform.valid)
   if (this.loginform.valid) {
      //get the user inputs
      const userData = {
        email: this.loginform.value.email,
        password: this.loginform.value.password,
      };

      //retrieve the user from the database through the auth service 
      this.authService.login().subscribe(data => {
        console.log(data);
        // Check if the entered credentials match the data from the server
        const userExists = data.find((user: any) => user.email === userData.email && user.password === userData.password);
        if (userExists) {
          //check its id  and assign a variable 
          console.log(userExists.id)
          const loggedInUserId=userExists.id
          //store the Id in the local storage 
          localStorage.setItem('loggedInUserId', loggedInUserId.toString());
          //emit the isLoggedInChange event
          this.dataTransmitService.transmitIsLoggedIn(true);

          //open snackbar
          setTimeout(() => {
            this.openSnackBar('Logged in successfully', 'success-notification');
            this.authService.login();
            this.router.navigate(['/features/myprofile']);
          }, 2000);
        }
        else {
          this.openSnackBar('The User Does not exist', 'error-notification');
        }
      });
    }
    else {
      this.openSnackBar('Please fill all the fields', 'error-notification');
    }
 }

//signup event handler 
    registerUser() {
      if (this.signupform.valid) {
        //get the user inputs 
        const userData = {
          email: this.signupform.value.email,
          password: this.signupform.value.password,
        };

        console.log("Regitered Data", userData);
        //pass the data to the service for signing up
        this.authService.signup(userData).subscribe(
          (res: any)=>{
            //check its id  and assign a variable 
          console.log(res.id)
          const loggedInUserId=res.id

          //store the Id in the local storage 
          localStorage.setItem('loggedInUserId', loggedInUserId.toString());

          //emit the isLoggedInChange event
          this.dataTransmitService.transmitIsLoggedIn(true);

          //open snackbar
          setTimeout(() => {
            this.openSnackBar('Registered  successfully', 'success-notification');
            this.authService.login();
            this.router.navigate(['/features/myprofile']);
          }, 2000);
          });
       
      }
      else {
        this.openSnackBar('Please fill all the fields', 'error-notification');
      }
    }
}
