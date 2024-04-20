;
import { InvalidrouteComponent } from './Components/invalidroute/invalidroute.component'
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { PopularRecipesComponent } from './Components/popular-recipes/popular-recipes.component';
import { TestimonialsComponent } from './Components/testimonials/testimonials.component';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';


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
