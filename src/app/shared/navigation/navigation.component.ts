import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.scss'
})
export class NavigationComponent {
  constructor(private router:Router){

  }
    //logout 
    Logout(){
    localStorage.removeItem('loggedInUserId');
     this.router.navigate(['/landingpage']);

   }
 }
 