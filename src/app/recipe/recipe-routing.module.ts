import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyRecipeComponent } from './my-recipe/my-recipe.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { EditRecipeComponent } from './edit-recipe/edit-recipe.component';

const routes: Routes = [
  {path: 'myprofile', component: MyProfileComponent},
  {path: 'newrecipe', component: NewRecipeComponent},
  {path: 'myrecipe', component: MyRecipeComponent},
  {path: 'editrecipe/:id', component: EditRecipeComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipeRoutingModule { }
