import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { FormGroup } from '@angular/forms';
import { UsersService } from '../../Services/users.service';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyprofileComponent implements OnInit{
changeCred!: FormGroup<any>;
  userData: any;

constructor(private router: Router, private dialog: MatDialog,
  private userservice: UsersService
){
  
}
  //edit the user profile 
  Edit(){
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '550px', 
       // Prevent closing by clicking outside or pressing ESC
      disableClose: true
    });
  } 

  ngOnInit(): void {
    //get logged in userid
    const userId = localStorage.getItem('loggedInUserId');
    if (userId) {
      // Fetch user data based on user ID
      this.userservice.getuserData(userId).subscribe(data => {
        // Process the fetched user data here
        console.log(data);
        this.userData=data;
      });
    } else {
      console.error('User ID not found in local storage');
    }
  }
}
