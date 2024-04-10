import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {
  @Output() isSignup: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private router: Router) { }
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
