import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { UserListRoutingModule } from './user-list-routing.module';
import { UserListComponent } from './user-list/user-list.component';


@NgModule({
  declarations: [UserListComponent],
  imports: [
    CommonModule,
    RouterModule,
    DemoMaterialModule,
    UserListRoutingModule,
    FlexLayoutModule
  ]
})
export class UserListModule { }
