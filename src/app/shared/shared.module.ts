import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchFilterComponent } from './search-filter/search-filter.component';
import { NavigationComponent } from './navigation/navigation.component';



@NgModule({
  declarations: [
    SearchFilterComponent,
    NavigationComponent
  ],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
