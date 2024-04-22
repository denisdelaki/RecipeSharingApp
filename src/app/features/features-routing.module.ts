import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyprofileComponent } from './Components/myprofile/myprofile.component';
import { RecipesComponent } from './Components/recipes/recipes.component';
import { RecipeDetailComponent } from './Components/recipe-detail/recipe-detail.component';
import { GuardService } from '../auth/Services/guard.service';
const routes: Routes = [
  {path: 'myprofile', component: MyprofileComponent, canActivate: [GuardService]},
  {path: 'myrecipes', component: RecipesComponent, canActivate: [GuardService]},
  {path: 'allrecipes', component: RecipesComponent, canActivate: [GuardService]},
  {path: 'recipedetail/:id', component: RecipeDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
