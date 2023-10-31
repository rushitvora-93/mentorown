import 'hammerjs';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { CdkTableModule } from '@angular/cdk/table';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
// import { DialogComponent } from './dialog/dialog.component';
// import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    DemoMaterialModule,
    HttpModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      positionClass : 'toast-top-right',
      preventDuplicates : false
    }),
    CdkTableModule
  ],
  providers: [],
  declarations: [],
    // ConfirmationDialogComponent
  // DialogComponent],
  // entryComponents: [ConfirmationDialogComponent]
})
export class MaterialComponentsModule {}
