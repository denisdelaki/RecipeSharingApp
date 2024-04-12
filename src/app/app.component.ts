import { Component, Input } from '@angular/core';
import { AuthService } from './auth/Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() isSignup: boolean = false;
  isLoggedIn: boolean = false; 
  title = 'RecipeSharingApp';
  constructor(private authService: AuthService) {}

  onIsSignupChange(isSignup: boolean) {
    console.log('isSignup changed:', isSignup);
    this.isSignup = isSignup;
    this.authService.setIsSignup(isSignup);
  }


}
