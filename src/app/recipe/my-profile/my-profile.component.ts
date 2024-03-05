import { Component } from '@angular/core';
import { UserService } from '../../core/user.service';
import { EditMyProfileComponent } from '../edit-my-profile/edit-my-profile.component';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrl: './my-profile.component.scss'
})
export class MyProfileComponent {
  userData: any;
  defaultprofile="https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  constructor(private userService:UserService, private dialog: MatDialog,private router: Router) {}
  edit() {
    const dialogRef = this.dialog.open(EditMyProfileComponent, {
      width: '550px', 
       // Prevent closing by clicking outside or pressing ESC
      disableClose: true
    });
  }
  //fetch data from the server 
  ngOnInit(): void {
    //access local storage only when running on the browser
    if (typeof window !== 'undefined') {
    // Fetch data from the server when the component initializes
    const userId = localStorage.getItem('loggedInUserId');
    if (userId) {
      // Fetch user data based on user ID
      this.userService.getData(userId).subscribe(data => {
        // Process the fetched user data here
        console.log(data);
        this.userData=data;
      });
    } else {
      console.error('User ID not found in local storage');
    }
  }
}
  //logout 
  Logout(){
    this.router.navigate(['/LandingPage']);
  }
}

