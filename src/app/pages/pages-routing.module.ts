import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AllRecipesComponent } from './all-recipes/all-recipes.component';
import { ViewRecipeComponentComponent } from './view-recipe-component/view-recipe-component.component';

const routes: Routes = [
  //{path: '', component: LandingPageComponent},
  {path: 'landingpage', component: LandingPageComponent, pathMatch: "full"},
  {path: 'allrecipes', component: AllRecipesComponent},
  {path: 'recipe/:id', component: ViewRecipeComponentComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
