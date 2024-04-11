import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyprofileComponent } from './Components/myprofile/myprofile.component';
import { RecipesComponent } from './Components/recipes/recipes.component';

const routes: Routes = [
  {path: 'myprofile', component: MyprofileComponent},
  {path: 'allrecipes', component: RecipesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
