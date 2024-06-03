import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { GuardService } from '../auth/services/guard.service';
import { FavoritesComponent } from './components/favorites/favorites.component';
const routes: Routes = [
  {path: 'myprofile', component: MyprofileComponent, canActivate: [GuardService]},
  {path: 'myrecipes', component: RecipesComponent, canActivate: [GuardService]},
  {path: 'allrecipes', component: RecipesComponent, canActivate: [GuardService]},
  {path: 'favorites', component: FavoritesComponent, canActivate: [GuardService]},
  {path: 'recipedetail/:id', component: RecipeDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
