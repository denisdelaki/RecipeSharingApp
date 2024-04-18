import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{
  editProfile!: FormGroup;

  constructor(private formBuilder: FormBuilder, 
    private usersService: UsersService,
    public dialogRef: MatDialogRef<EditProfileComponent>) {
    this.editProfile = this.formBuilder.group({
      fullName: ['',], 
      email: ['', [ Validators.email]], 
      profilePicture: ['', Validators.pattern('https?://.+')],
      phoneNumber: ['', Validators.pattern('[0-9]{10}')], 
      address: ['', Validators.pattern('https?://.+')],
      facebook: ['', Validators.pattern('https?://.+')], 
      twitter: ['', Validators.pattern('https?://.+')],
      instagram: ['', Validators.pattern('https?://.+')],
      blog: ['', Validators.pattern('https?://.+')],
    });
  }

  ngOnInit(): void {
    console.log('ngOnInit is called'); 
    // Fetch user data and populate the form fields
    const userId = localStorage.getItem('loggedInUserId');
    if (userId) {
      this.usersService.getuserData(userId).subscribe(userData => {
        // Set form values with fetched data
        this.editProfile.patchValue({
          fullName: userData?.fullName,
          email: userData?.email,
          profilePicture: userData?.profilePicture,
          phoneNumber: userData?.phoneNumber, 
          address: userData?.address,
          facebook: userData?.socials?.facebook, 
          twitter: userData?.socials?.twitter,
          instagram: userData?.socials?.instagram,
          blog: userData?.socials?.blog
        });
      });
    }
    else{
      console.log("loggin");
    }
  }
  

save() {
  if (this.editProfile.valid){
    const userId=localStorage.getItem('loggedInUserId');
    console.log(userId);
    const updateduserData = {
      fullName: this.editProfile.value.fullName, 
      email: this.editProfile.value.email,
      profilePicture: this.editProfile.value.profilePicture,
      phoneNumber: this.editProfile.value.phoneNumber,
      address: this.editProfile.value.address,
      socials :{  
          facebook: this.editProfile.value.facebook, 
          twitter: this.editProfile.value.twitter,
          instagram: this.editProfile.value.instagram,
          blog: this.editProfile.value.blog 
      }
    }
    console.log(updateduserData);
    this.usersService.updateUserData(userId, updateduserData).subscribe(
      (res: any) => {
        console.log(res);
        this.dialogRef.close();
      })
  }else{

  }
}
close() {
  this.dialogRef.close();
}

}
