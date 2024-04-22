import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./myprofile.component.css']
})
export class MyprofileComponent implements OnInit {
  changeCred: FormGroup; 
  userData: any;
  defaultprofile = "https://github.com/Eb-Developer-Playground/Recipe_share_app/blob/myrecipes/src/assets/Images/chefimage.jpg?raw=true";

  constructor(
    private router: Router, 
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private userservice: UsersService
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
    if (typeof localStorage !== 'undefined') {
      // Fetch user data based on user ID
      const userId = localStorage.getItem('loggedInUserId');
      console.log(userId);
      if (userId !== "" && userId !== undefined) {
        this.userservice.getuserData(userId || '').subscribe(data => {
          this.userData = data;
          console.log(this.userData);
        });
      } else {
        console.error('User ID not found in local storage');
      }
    } else {
      console.error('localStorage is not available');
    }
  }

  viewSavedRecipes(){
    this.router.navigate(['/features/favorites'])
  }
  
}
