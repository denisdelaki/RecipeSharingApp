import { Component, ViewChild } from '@angular/core';
import { TestimonialsService } from '../Pages_Services/testimonials.service';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-testimonials',
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.scss'
})
export class TestimonialsComponent {
  @ViewChild('stepper', { static: true }) stepper!: MatStepper;

  reviews: any;
   timer: any;
 

   constructor(private testimonials: TestimonialsService) {}

  ngOnInit(): void {
    this.testimonials.getData().subscribe(data => {
      this.reviews = data; 
      // this.startAutoSlide()   
  });
  }

  startAutoSlide(): void {
    this.timer = setInterval(() => {
      this.slideToNext();
    }, 5000); 
  }

  slideToNext(): void {
    // Check if there is a next step, if not, go to the first step
    if (this.stepper.selectedIndex < this.reviews.length - 1) {
      this.stepper.selectedIndex++;
    } else {
      this.stepper.selectedIndex = 0;
    }
    // this.startAutoSlide()
  }

  slideToPrev(): void {
    // Check if there is a previous step, if not, go to the last step
    if (this.stepper.selectedIndex > 0) {
      this.stepper.selectedIndex--;
    } else {
      this.stepper.selectedIndex = this.reviews.length - 1;
    }
    // this.startAutoSlide()
  }
}