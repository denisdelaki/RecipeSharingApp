import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css'
})
export class AuthComponent {
  //data passage to and from other components 
 
  @Input() isSignup: boolean = true;
  @Output() isLoggedInChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  userForm: FormGroup;
  loginform: FormGroup;
  
constructor(private formBuilder: FormBuilder, ){
    this.userForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)]]
    });
    this.loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/)]]
    });
  }


  login() {
    throw new Error('Method not implemented.');
    }
    registerUser() {
    throw new Error('Method not implemented.');
    }
}
