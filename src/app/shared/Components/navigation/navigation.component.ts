import { Component, EventEmitter, Inject, OnInit, Output, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { DataTransmitService } from '../../Services/data-transmit.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmLogoutDialogComponent } from '../../Interceptor/confirm-logout-dialog/confirm-logout-dialog.component';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent implements OnInit {
  @Output() isSignup: EventEmitter<boolean> = new EventEmitter<boolean>();
  isLoggedIn: boolean = false;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private router: Router, 
    private dialog: MatDialog,
    private dataTransmitService: DataTransmitService) { }

    ngOnInit() {
      let UserId;
      if (isPlatformBrowser(this.platformId)) {
        const localStorage = window.localStorage;
         UserId = localStorage.getItem('loggedInUserId');
      }
      this.dataTransmitService.isLoggedIn$.subscribe(isLoggedIn => {  
        this.isLoggedIn = isLoggedIn;
      });
     // Check if the user ID exists in the local storage to determine isLoggedIn status
      if (UserId) {
        this.isLoggedIn = true;
      } else {
        this.isLoggedIn = false;
      }
      console.log("isLoggedIn", this.isLoggedIn);
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

  confirmlogout(){
    const dialogRef = this.dialog.open(ConfirmLogoutDialogComponent, {
      width: '350px',
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // If user confirmed deletion
        this.Logout()
      }
    });
  } 

  Logout(){
    localStorage.removeItem('loggedInUserId');
    this.isLoggedIn = false;
    this.router.navigate(['/auth/']);
   
  }
}
