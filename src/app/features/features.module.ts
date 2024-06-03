import { forwardRef, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';

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
import { SharedModule } from '../shared/shared.module';
import { FavoritesComponent } from './components/favorites/favorites.component';
import { RecipemanagementComponent } from './components/recipemanagement/recipemanagement.component';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';


@NgModule({
  declarations: [
    MyprofileComponent,
    EditProfileComponent,
    RecipesComponent,
    RecipeDetailComponent,
    FavoritesComponent,
    RecipemanagementComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,MatFormFieldModule
    ,MatInputModule, MatCardModule,MatSelectModule,MatOptionModule,
    MatIconModule,MatButtonModule, MatLabel,
    MatDialogModule,
    FeaturesRoutingModule, SharedModule,
  ],
  providers:[
    {
      provide: MatDialogRef,
      useValue: {}
    },
    {
      provide: MAT_DIALOG_DATA,
      useValue: {}
    },
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RecipemanagementComponent),
      multi: true,
    }
  ]
})
export class FeaturesModule { }
