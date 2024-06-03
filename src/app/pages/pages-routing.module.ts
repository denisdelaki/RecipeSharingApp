import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { TestimonialsComponent } from './components/testimonials/testimonials.component';
import { InvalidrouteComponent } from './components/invalidroute/invalidroute.component';
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
