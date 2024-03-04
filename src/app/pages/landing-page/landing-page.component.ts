import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TestimonialsService } from '../Pages_Services/testimonials.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {
  testimonies: any[] = [];
  currentSlide = 0;

  constructor(private router: Router, private testimonialsService: TestimonialsService) {}

  ngOnInit() {
    this.loadTestimonies();
  }

  loadTestimonies() {
    this.testimonialsService.getData().subscribe(
      (data: any[]) => {
        this.testimonies = data;
      },
      (error) => {
        console.error('Error loading testimonies:', error);
      }
    );
  }

  SignUp(): void {
    this.router.navigate(['auth/signup']);
  }

  Login(): void {
    this.router.navigate(['auth/login']);
  }
}
