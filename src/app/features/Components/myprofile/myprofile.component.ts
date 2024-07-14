import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../services/users.service';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';

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
    private afAuth: AngularFireAuth,
    private db: AngularFireDatabase
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
        // Fetch user data from the realtime database
        this.db.object(`/users/${user.uid}`).valueChanges().subscribe((userData: any) => {
          if (userData) {
            this.userData = userData as User;
          } else {
            console.log('User data not found in database');
          }
        });
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
