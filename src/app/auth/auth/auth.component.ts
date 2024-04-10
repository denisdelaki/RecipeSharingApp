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

  userForm: FormGroup;
  loginform: FormGroup;
  
constructor(private formBuilder: FormBuilder,private authService: AuthService){
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)]]
    });
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)]]
    });
  }
ngOnInit(): void {
  // Subscribe to the isSignup$ observable in the shared service
  this.authService.isSignup$.subscribe(isSignup => {
    this.isSignup = isSignup;
  });
  console.log(this.isSignup)
}

  login() {
    throw new Error('Method not implemented.');
    }
    registerUser() {
    throw new Error('Method not implemented.');
    }
}
