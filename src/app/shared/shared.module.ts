import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { MatLabel, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { ConfirmLogoutDialogComponent } from './interceptor/confirm-logout-dialog/confirm-logout-dialog.component';
import { FilterComponent } from './components/filter/filter.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { SearchComponent } from './components/search/search.component';
import { ConfirmDialogComponent } from './interceptor/confirm-dialog/confirm-dialog.component';


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
