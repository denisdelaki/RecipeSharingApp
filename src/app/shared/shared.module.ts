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
import { FooterComponent } from './Components/footer/footer.component';
import { ConfirmDialogComponent } from './Interceptor/confirm-dialog/confirm-dialog.component';
import { ConfirmLogoutDialogComponent } from './Interceptor/confirm-logout-dialog/confirm-logout-dialog.component';


@NgModule({
  declarations: [
    NavigationComponent,
    SearchComponent,
    FilterComponent,
    FooterComponent,
    ConfirmDialogComponent,
    ConfirmLogoutDialogComponent
  ],
  imports: [
    CommonModule,
    SharedRoutingModule, MatInputModule,MatLabel, ReactiveFormsModule,MatFormFieldModule, 
    MatIconModule, MatSelectModule, MatOptionModule, 
  ],
  exports: [
    NavigationComponent,
    SearchComponent,
    FilterComponent,
    FooterComponent
  ],
})
export class SharedModule { }
