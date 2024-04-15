import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { SearchComponent } from './Components/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    NavigationComponent,
    SearchComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule, MatInputModule,MatLabel, ReactiveFormsModule,MatFormFieldModule, MatIconModule
  ],
  exports: [
    NavigationComponent,
    SearchComponent
  ],
})
export class SharedModule { }
