import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './login/login.component';
import { MatIconModule} from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatCardModule } from '@angular/material/card'
import { MaterialModule } from '../material/material.module';
@NgModule({
  declarations: [
    LoginComponent,

  ],
  imports: [
    CommonModule,
    AuthenticationRoutingModule,
    MaterialModule
    
  ]
})
export class AuthenticationModule { }
