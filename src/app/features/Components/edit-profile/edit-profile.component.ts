import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent {
  editProfile!: FormGroup;
  constructor(private formBuilder: FormBuilder, 
    private usersService: UsersService,
    public dialogRef: MatDialogRef<EditProfileComponent>) {
    this.editProfile = this.formBuilder.group({
      fullName: ['',], 
      email: ['', [ Validators.email]], 
      profilePicture: ['', Validators.pattern('https?://.+')],
      phonumber: ['', Validators.pattern('[0-9]{10}')], 
      address: [''],
      facebook: [''], 
      twitter: [''],
      instagram: [''],
      personalBlog: ['']
    });
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
