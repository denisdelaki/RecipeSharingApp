import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import { TestimonialsComponent } from './Components/testimonials/testimonials.component';
import { InvalidrouteComponent } from './Components/invalidroute/invalidroute.component';
const routes: Routes = [
  {path: '', component:LandingPageComponent},
  {path: 'testimonials', component:TestimonialsComponent},
  {path: '**', component: InvalidrouteComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
