import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyprofileComponent {
changeCred!: FormGroup<any>;

constructor(private router: Router, private dialog: MatDialog){
  
}
  //edit the user profile 
  Edit(){
    const dialogRef = this.dialog.open(EditProfileComponent, {
      width: '550px', 
       // Prevent closing by clicking outside or pressing ESC
      disableClose: true
    });
  } 
}
