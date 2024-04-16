import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './Components/landing-page/landing-page.component';
import path from 'node:path';
import { TestimonialsComponent } from './Components/testimonials/testimonials.component';

const routes: Routes = [
  {path: '', component:LandingPageComponent},
  {path: 'testimonials', component:TestimonialsComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
