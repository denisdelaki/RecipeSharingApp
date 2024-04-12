import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyprofileComponent } from './Components/myprofile/myprofile.component';
import { RecipesComponent } from './Components/recipes/recipes.component';
import { RecipeDetailComponent } from './Components/recipe-detail/recipe-detail.component';

const routes: Routes = [
  {path: 'myprofile', component: MyprofileComponent},
  {path: 'myrecipes', component: RecipesComponent},
  {path: 'allrecipes', component: RecipesComponent},
  {path: 'recipedetail/:id', component: RecipeDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
