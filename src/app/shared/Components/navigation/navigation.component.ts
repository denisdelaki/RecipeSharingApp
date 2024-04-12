import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransmitService } from '../../Services/data-transmit.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
  @Output() isSignup: EventEmitter<boolean> = new EventEmitter<boolean>();
  isLoggedIn: boolean = false;

  constructor(private router: Router, 
    private dataTransmitService: DataTransmitService) { }

    ngOnInit() {
     // Check if the user ID exists in the local storage to determine isLoggedIn status
    const UserId = localStorage.getItem('loggedInUserId');
    this.isLoggedIn = !!UserId; 
      this.dataTransmitService.isLoggedIn$.subscribe(isLoggedIn => {
        console.log("isLoggedIn", this.isLoggedIn);
        this.isLoggedIn = isLoggedIn;
      });
    }

  Login(){
    this.isSignup.emit(false);
    this.router.navigate(['/auth/']);
  }
  Signup(){
    this.isSignup.emit(true);
    this.router.navigate(['/auth/']);
    // this.isLoggedInChange.emit(this.isSignup);
  }
}
