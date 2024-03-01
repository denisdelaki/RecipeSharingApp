import { Component } from '@angular/core';
import { TestimonialsService } from '../Pages_Services/testimonials.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrl: './landing-page.component.scss'
})
export class LandingPageComponent {
  testimonies: any[] = [];
  currentSlide = 0;
  private sliderSubscription: Subscription | undefined;
  constructor(private router: Router, private testimonials: TestimonialsService) {}
  
 
  SignUp(): void {
    this.router.navigate(['auth/signup']);
  }

  Login(): void {
    this.router.navigate(['auth/login']);
  }
}
