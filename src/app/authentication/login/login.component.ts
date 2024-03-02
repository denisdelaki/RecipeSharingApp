import { Component } from '@angular/core';
import { FormBuilder,Validators, FormControl, FormsModule,  FormGroup } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../core/user.service';
import { AuthService } from '../auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
 //declare user data 
 loginUser: any = {
  email: "",
  password: ""
};
///form control and validations 
hideRequiredControl = new FormControl(false);
floatLabelControl = new FormControl('auto' as FloatLabelType);

options: FormGroup = this._formBuilder.group({
  hideRequired: this.hideRequiredControl,
  floatLabel: this.floatLabelControl,
});
loading= false;

constructor(private _formBuilder: FormBuilder,private router: Router,
   private userService: UserService,
   private authService: AuthService,
   private snackBar: MatSnackBar,) {
  this.options = this._formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
  });
}
openSnackBar(message: string, panelClass: string): void {
  this.snackBar.open(message, 'Close', {
    duration: 2000, 
    panelClass: [panelClass],
  });
}
// Get the labels on focus of the input field
getFloatLabelValue(): FloatLabelType {
  return this.floatLabelControl.value || 'auto';
}
// Email validations
email = new FormControl('', [Validators.required, Validators.email]);
getErrorMessage() {
  if (this.email.hasError('required')) {
    return 'Enter valid email address';
  }  
  return this.email.hasError('email') ? 'Not a valid email' : '';
}
  //login function to handle user logins 
  onSubmit() {
    if (this.options.valid) {
      // Form is valid, you can access the form control values
      const getEmail = this.options.get('email');
      const getPassword = this.options.get('password');
      //ensure that they are not null
     if (getEmail&& getPassword){
        const email=getEmail.value;
        const password=getPassword.value;
        // console log the data 
        console.log('Email:', email);
        console.log('Password:', password);
        //get data from json file 
        console.log(this.loginUser)
        this.userService.getData().subscribe(data => {
          console.log('Data from service:', data);
        // Check if the entered credentials match the data from the server
        const userExists = data.find((user: any) => user.email === email && user.password === password);
        if (userExists) {
          //successful login 
          console.log(userExists.id)
          const loggedInUserId=userExists.id
          localStorage.setItem('loggedInUserId', loggedInUserId);
          console.log(loggedInUserId)            
          this.loading = true;
          setTimeout(() => {
            this.openSnackBar('Logged in successfully', 'success-notification');
            this.authService.login();
            this.router.navigate(['/recipes/myprofile']);
            this.loading = false;
          }, 2000);
        } else {
          this.openSnackBar('Invalid Credentials', 'error-notification');
        }
        });
     }

    } else {
      // Form is invalid, handle validation errors
      this.openSnackBar('Not logged in Check connection/Fill all the fields', 'error-notification');
      
    }
  }
//function to handle navigation to signup page if the user doesn't have an account yet
navigateToSignUp() {
this.router.navigate(['/auth/signup']);
}
}
