import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../Services/auth.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent implements OnInit {
  //data passage to and from other components 
  @Input() isSignup: boolean = false;
  @Output() isLoggedInChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  signupform: FormGroup;
  loginform: FormGroup;
  
constructor(private formBuilder: FormBuilder,private authService: AuthService){
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
      // this.authService.login(this.loginform.value.email, this.loginform.value.password);
      this.isLoggedInChange.emit(this.isSignup);
    }
 }

//signup event handler 
    registerUser() {
      if (this.signupform.valid) {
        const userData = {
          email: this.signupform.value.email,
          password: this.signupform.value.password,
        };
        console.log("Regitered Data", userData);
        //pass the data to the service for signing up
        this.authService.signup(userData).subscribe(
          (res: any)=>{
            console.log(res)
          });
        this.isLoggedInChange.emit(this.isSignup);
      }
    }
}
