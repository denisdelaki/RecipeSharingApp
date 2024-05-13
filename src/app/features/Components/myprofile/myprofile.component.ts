import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../Services/users.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { User } from '../../model/user';
@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  changeCred: FormGroup; 
  userData!: User | null;
  defaultprofile = "https://github.com/Eb-Developer-Playground/Recipe_share_app/blob/myrecipes/src/assets/Images/chefimage.jpg?raw=true";

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private userService: UsersService,
    private afAuth: AngularFireAuth
  ) { 
    this.changeCred = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  // Edit the user profile 
  Edit() {
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '550px',
      // Prevent closing by clicking outside or pressing ESC
      disableClose: true
    });
  }

  ngOnInit(): void {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        //set the user profile data to be displayed 
        this.userData={
          displayName: user.displayName,
          email: user.email,
          phoneNumber: user.phoneNumber,
          photoURL: user.photoURL,
          address: null,
          socials: {
            facebook: null,
            twitter: null,
            instagram: null,
            blog: null
          }
        }
      } else {
        // User is signed out.
        console.log('No user is signed in.');
      }
    });
    
  }

  viewSavedRecipes(){
    this.router.navigate(['/features/favorites'])
  }
}
