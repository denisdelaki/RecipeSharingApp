import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FeaturesRoutingModule } from './features-routing.module';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MatCardModule } from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { RecipesComponent } from './components/recipes/recipes.component';
import { RecipeDetailComponent } from './components/recipe-detail/recipe-detail.component';
import { NewRecipeComponent } from './components/new-recipe/new-recipe.component';
import { EditrecipeComponent } from './components/editrecipe/editrecipe.component';
import { SharedModule } from '../shared/shared.module';
import { FavoritesComponent } from './components/favorites/favorites.component';


@NgModule({
  declarations: [
    MyprofileComponent,
    EditProfileComponent,
    RecipesComponent,
    RecipeDetailComponent,
    NewRecipeComponent,
    EditrecipeComponent,
    FavoritesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,MatFormFieldModule
    ,MatInputModule, MatCardModule,MatSelectModule,MatOptionModule,
    MatIconModule,MatButtonModule, MatLabel,
    FeaturesRoutingModule, SharedModule,
  ]
})
export class FeaturesModule { }
