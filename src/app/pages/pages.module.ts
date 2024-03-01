import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { PagesRoutingModule } from './pages-routing.module';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { RecommendedComponent } from './recommended/recommended.component';
import { TestimonialsComponent } from './testimonials/testimonials.component';
import { MatStepperModule } from '@angular/material/stepper';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { ViewRecipeComponentComponent } from './view-recipe-component/view-recipe-component.component';

@NgModule({
  declarations: [
    LandingPageComponent,
    RecommendedComponent,
    TestimonialsComponent,
    AllRecipesComponent,
    ViewRecipeComponentComponent
  ],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MaterialModule, 
    MatStepperModule
  ]
})
export class PagesModule { }
