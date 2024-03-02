import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SharedModule } from '../shared/shared.module';

import { RecipeRoutingModule } from './recipe-routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { MyRecipeComponent } from './my-recipe/my-recipe.component';
import { NewRecipeComponent } from './new-recipe/new-recipe.component';
import { EditMyProfileComponent } from './edit-my-profile/edit-my-profile.component';



@NgModule({
  declarations: [
    MyProfileComponent,
    MyRecipeComponent,
    NewRecipeComponent,
    EditMyProfileComponent
  ],
  imports: [
    CommonModule,
    RecipeRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class RecipeModule { }
