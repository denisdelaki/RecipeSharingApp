import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { UsersService } from '../../services/users.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{
  editProfile!: FormGroup;
  user!: User;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase,
    private formBuilder: FormBuilder, 
    private usersService: UsersService,
    public dialogRef: MatDialogRef<EditProfileComponent>
  ) {
    this.editProfile = this.formBuilder.group({
      fullName: [''],
      email: ['', Validators.email],
      profilePicture: ['', Validators.pattern('https?://.+')],
      phoneNumber: ['', [Validators.pattern('\\+254[0-9]{9}')]],
      address: [''],
      facebook: ['', Validators.pattern('https?://.+')],
      twitter: ['', Validators.pattern('https?://.+')],
      instagram: ['', Validators.pattern('https?://.+')],
      blog: ['', Validators.pattern('https?://.+')],
    });
  }
  ngOnInit(): void {
    // Fetch user data and populate the form fields
    this.afAuth.authState.subscribe(User => {
      if (User) {
        //set the user profile data to be displayed 
        this.db.object(`/users/${User.uid}`).valueChanges().subscribe((userData: any) => {
          if (userData) {
            console.log(userData.socials)
            console.log(userData.socials.facebook)
            this.editProfile.patchValue({
              fullName: userData.fullName,
              email: userData.email, // Use userData.email instead of User.email
              profilePicture: userData.photoURL,
              phoneNumber: userData.phoneNumber, // Use userData.phoneNumber
              address: userData.address, // Use userData.address
              facebook: userData.socials.facebook,
              twitter: userData.socials.twitter,
              instagram: userData.socials.instagram,
              blog: userData.socials.blog
            });
          } else {
            // User data not found
            console.log('User data not found');
          }
        });
      } else {
        // User is signed out.
        console.log('No user is signed in.');
      }
    });
  }
  
  

  save() {
    if (this.editProfile.valid) {
      const userId = localStorage.getItem('loggedInUserId');
      console.log(userId)
      if (userId) {
        const updatedUserData = {
          fullName: this.editProfile.value?.fullName,
          email: this.editProfile.value?.email,
          profilePicture: this.editProfile.value?.profilePicture,
          phoneNumber: this.editProfile.value?.phoneNumber,
          address: this.editProfile.value?.address,
          socials: {
            facebook: this.editProfile.value?.facebook,
            twitter: this.editProfile.value?.twitter,
            instagram: this.editProfile.value?.instagram,
            blog: this.editProfile.value?.blog
          }
        };
  
        this.usersService.updateUserData(userId, updatedUserData).then(() => {
          console.log('User data updated successfully');
          this.dialogRef.close(); 
        }).catch(error => {
          console.error('Error updating user data:', error);
        });
      } else {
        console.log('User ID not found in local storage');
      }
    } else {
      console.log('Form is invalid');
      // Handle invalid form
    }
  }
  
close() {
  this.dialogRef.close();
}

}
