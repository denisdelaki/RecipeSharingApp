;
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ContactUsComponent } from './components/contact-us/contact-us.component';
import { InvalidrouteComponent } from './components/invalidroute/invalidroute.component';
import { PopularRecipesComponent } from './components/popular-recipes/popular-recipes.component';


@NgModule({
  declarations: [
    LandingPageComponent,
    AboutUsComponent,
    ContactUsComponent,
    PopularRecipesComponent,
    TestimonialsComponent,
    InvalidrouteComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    NgbCarouselModule,
    MatIconModule,
    SharedModule
  ]
})
export class PagesModule { }
