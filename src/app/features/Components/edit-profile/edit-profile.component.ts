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
      address: [''],
      facebook: [''], 
      twitter: [''],
      instagram: [''],
      blog: ['']
    });
  }
  ngOnInit(): void {
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
  }
  
EditProfile() {
throw new Error('Method not implemented.');
}
  editForm!: FormGroup<any>;
save() {
  if (this.editProfile.valid){
    const userId=localStorage.getItem('loggedInUserId');
    console.log(userId);
    const updateduserData = {
      fullName: this.editProfile.value.fullName, 
      email: this.editProfile.value.email,
      profilePicture: this.editProfile.value.profilePicture,
      phoneNumber: this.editProfile.value.phonumber,
      address: this.editProfile.value.address,
      socials :{  
          facebook: this.editProfile.value.facebook, 
          twitter: this.editProfile.value.twitter,
          instagram: this.editProfile.value.instagram,
           personalBlog: this.editProfile.value.personalBlog 
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
