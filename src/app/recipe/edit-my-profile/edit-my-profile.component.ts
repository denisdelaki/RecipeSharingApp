import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { FloatLabelType } from '@angular/material/form-field';
import { UserService } from '../../core/user.service';
import { AuthService } from '../../authentication/auth.service';

@Component({
  selector: 'app-edit-my-profile',
  templateUrl: './edit-my-profile.component.html',
  styleUrl: './edit-my-profile.component.scss'
})
export class EditMyProfileComponent implements OnInit {
  floatLabelControl = new FormControl('auto' as FloatLabelType);
  editForm!: FormGroup;
  //jwtservice = new Inject(JwtHelperService)

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<EditMyProfileComponent>
  ) { }

  ngOnInit(): void {
    this.editForm = this.formBuilder.group({
      username: [''],
      email: ['', Validators.email],
      address: [''],
      telephone: [''],
      restaurant: [''],
      profileurl: [''],
      facebook: ['']
    });
     // Fetch user data and populate the form fields
     const userId = localStorage.getItem('loggedInUserId');
     if (userId) {
       this.userService.getData(userId).subscribe(userData => {
         // Set form values with fetched data
         this.editForm.patchValue({
           username: userData?.username,
           email: userData?.email,
           address: userData?.profile?.address,
           telephone: userData?.profile?.telephone,
           restaurant: userData?.profile?.restaurant,
           profileurl: userData?.profile?.profileurl,
           facebook: userData?.profile?.facebook
         });
       });
     }
   }
  getFloatLabelValue(): FloatLabelType {
    return this.floatLabelControl.value || 'auto';
  }

  getErrorMessage() {
    const email = this.editForm.get('email');
    return email?.hasError('email') ? 'Not a valid email' : '';
  }

  onSubmit() {
    // Logic for form submission
  }

  save() {
    if (this.editForm.valid) {
      const userId=localStorage.getItem('loggedInUserId');
      console.log(userId);
      const updateduserData = {
        username: this.editForm.value.username,
        email: this.editForm.value.email,
        profile: {
          telephone: this.editForm.value.telephone,
          restaurant: this.editForm.value.restaurant,
          address: this.editForm.value.address,
          profileurl: this.editForm.value.profileurl,
          facebook: this.editForm.value.facebook
        }
      };
      console.log(updateduserData);
      this.userService.updateUserData(userId, updateduserData).subscribe(
        (res) => {
          console.log(res);
          this.dialogRef.close();
          //reload the page to update the data 
          window.location.reload();
        },
        (error) => {
          console.error(error);
          // Handle error if needed
        }
      );
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
