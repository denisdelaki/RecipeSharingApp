import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PagesRoutingModule } from './pages-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { MatStepperModule } from '@angular/material/stepper';

@NgModule({
  declarations: [
    LandingPageComponent,
    RecommendedComponent,
    TestimonialsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule, 
    MatStepperModule
  ]
})
export class PagesModule { }
