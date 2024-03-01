import { Component } from '@angular/core';
import { FormBuilder,Validators, FormControl, FormsModule,  FormGroup } from '@angular/forms';
import { FloatLabelType } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from '../../core/user.service';
import { UserData } from '../Interface/Userdata';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})
export class SignupComponent {
//data declaration 
users:UserData [] = [];

user:any ={
  username: "",
  email: "",
  password: "",
  passwordconfirm: "",
  profile: {
    telephone: "",
    address: "",
    restaurant: "",
    profileurl: "",
    facebook: ""
  }
}


  hideRequiredControl = new FormControl(false);
  floatLabelControl = new FormControl('auto' as FloatLabelType);

  options: FormGroup = this._formBuilder.group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
    username: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    passwordconfirm: ['', Validators.required]    
  },
   {
    validator: this.passwordMatchValidator.bind(this)
  });
//loading page 
  loading = false;
  constructor(private _formBuilder: FormBuilder, 
    private snackBar: MatSnackBar,
    private userService: UserService, private router: Router) {}
    //error messages 
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
  
  //  validations
  username = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  passwordconfirm = new FormControl('', [Validators.required]);
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a valid email address';
    }   
    return this.email.hasError('email') ? 'Not a valid email' : '';

  }
  passwordMatchValidator(formGroup: FormGroup) {
    const password = formGroup.controls['password'].value;
    const confirmPassword = formGroup.controls['passwordconfirm'].value;
     // Ensure both controls are available before comparing values
      if (password !== null && confirmPassword !== null) {
        return password === confirmPassword ? null : { mismatch: true };
  }
  // If either control is null, consider them not matching
  return { mismatch: true };
  }
  //handle login navigation
  navigateToLogin (){
    this.loading = true;
    console.log("loading")
    setTimeout(() => {
      this.router.navigate(['/login']);
      this.loading = false;
    }, 1000);
  }
  checker(){
    this.userService.getData().subscribe(data => {
      console.log(data.user)
     //check if the email already exists
    });
  };
  //handle data submission   
  onSubmit(){
  if (this.options.valid ) {
      // Form is valid, you can access the form control values
      const getUsername = this.options.get('username');
      const getEmail = this.options.get('email');
      const getPassword = this.options.get('password');
      const getPasswordconfirm = this.options.get('passwordconfirm');
      //ensure that they are not null
        if (getUsername && getEmail&& getPassword&& getPasswordconfirm){
           //get the values inputted by the user
          const username=getUsername.value;
          const email=getEmail.value;
          const password=getPassword.value;
          const passwordconfirm=getPasswordconfirm.value;
          //An object to hold the current user information to be posted 
          const userData = {
          username: username,
          email: email,
          password: password,
          passwordconfirm: passwordconfirm,
          };
          //post the data to the server          
          this.userService.createusers(userData).subscribe(
          res=>{
            console.log(res);
            this.checker();
            this.users.push({
              username: res.username,
              email: res.email,
              password: res.password, 
              passwordconfirm: res.passwordconfirm})
              this.loading = true;
              this.openSnackBar('Signedup in successfully, Welcome', 'success-notification');
              this.router.navigate(['/login'])
        })
        
      }
  else{
    console.log("not valid")
    this.openSnackBar('Signup unsuccessful', 'error-notification');
  }

  }
}
}




