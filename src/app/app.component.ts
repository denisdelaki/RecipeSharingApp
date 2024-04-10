import { Component, Input } from '@angular/core';
import { AuthService } from './auth/Services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  @Input() isSignup: boolean = false;
  title = 'RecipeSharingApp';
constructor(private autService : AuthService ){}
  onIsSignupChange(isSignup: boolean) {
    console.log(isSignup);
    this.isSignup = isSignup;
    this.autService.setIsSignup(isSignup);
    }
}
