import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { NavigationComponent } from './Components/navigation/navigation.component';
import { SearchComponent } from './Components/search/search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { FilterComponent } from './Components/filter/filter.component';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';


@NgModule({
  declarations: [
    NavigationComponent,
    SearchComponent,
    FilterComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule, MatInputModule,MatLabel, ReactiveFormsModule,MatFormFieldModule, 
    MatIconModule, MatSelectModule, MatOptionModule, 
  ],
  exports: [
    NavigationComponent,
    SearchComponent,
    FilterComponent
  ],
})
export class SharedModule { }
