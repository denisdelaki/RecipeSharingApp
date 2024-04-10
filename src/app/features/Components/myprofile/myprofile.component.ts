import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrl: './myprofile.component.css'
})
export class MyprofileComponent {

constructor(private router: Router, private dialog: MatDialog){
  
}
  //edit the user profile 
  Edit(){

  } 
}
