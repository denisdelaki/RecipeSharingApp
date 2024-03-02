import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { NavigationComponent } from './navigation/navigation.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    SearchFilterComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule,MaterialModule,RouterModule
  ],
  exports:[NavigationComponent, SearchFilterComponent]
})
export class SharedModule { }
