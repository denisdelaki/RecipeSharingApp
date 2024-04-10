import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { FeaturesRoutingModule } from './features-routing.module';
import { MyprofileComponent } from './Components/myprofile/myprofile.component';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';


@NgModule({
  declarations: [
    MyprofileComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,MatFormFieldModule,MatInputModule,MatIconModule,MatButtonModule, MatLabel,
    FeaturesRoutingModule
  ]
})
export class FeaturesModule { }
