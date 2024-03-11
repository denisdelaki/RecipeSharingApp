import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyRecipeComponent } from './my-recipe/my-recipe.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';
import { AuthGuard } from '../core/AuthGuard';
const routes: Routes = [
  {path: 'myprofile', component: MyProfileComponent, },
  {path: 'newrecipe', component: NewRecipeComponent, canActivate: [AuthGuard]},
  {path: 'myrecipe', component: MyRecipeComponent, },
  {path: 'allrecipe', component: MyRecipeComponent,canActivate: [AuthGuard]},
  {path: 'editrecipe/:id', component: EditRecipeComponent, canActivate: [AuthGuard]},
]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
