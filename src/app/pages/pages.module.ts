import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { AboutUsComponent } from './Components/about-us/about-us.component';
import { ContactUsComponent } from './Components/contact-us/contact-us.component';
import { PopularRecipesComponent } from './Components/popular-recipes/popular-recipes.component';
import { TestimonialsComponent } from './Components/testimonials/testimonials.component';
import { MaterialModule } from './Material/Material';


@NgModule({
  declarations: [
    LandingPageComponent,
    AboutUsComponent,
    ContactUsComponent,
    PopularRecipesComponent,
    TestimonialsComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule
  ]
})
export class PagesModule { }
