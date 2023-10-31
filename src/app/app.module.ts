import * as $ from 'jquery';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AppRoutes } from './app.routing';
import { AppComponent } from './app.component';

import { FlexLayoutModule } from '@angular/flex-layout';
import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './demo-material-module';

import { SharedModule } from './shared/shared.module';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../app/guards/auth.guard';
import { JwtModule } from '@auth0/angular-jwt';
import { environment } from '../environments/environment';
import { ToastrModule } from 'ngx-toastr';
import { StorageModule } from '@ngx-pwa/local-storage';
import { ApiLoaderComponent } from './api-loader/api-loader.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { MatDialogModule } from '@angular/material';
import { MyProfileSetModule } from './my-profile-set/my-profile-set.module';
import { ResumeModule } from './resume/resume.module';
import { SettingsComponent } from './settings/settings.component';
import { NgxMatPopoverModule } from 'ngx-mat-popover';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { ForgotPasswordComponent } from './settings/forgot-password/forgot-password.component';
import { SignUpDetailsComponent } from './sign-up-details/sign-up-details.component';
import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/languages/de.js';
import 'froala-editor/js/third_party/image_tui.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/embedly.min';
import { NotFoundComponent } from './not-found/not-found.component';
import { ConfirmationDialogComponent } from './material-component/confirmation-dialog/confirmation-dialog.component';
import { AppBlankComponent } from './layouts/blank/blank.component';
import { DialogComponent } from './material-component/dialog/dialog.component';
import { LocalStorageService } from 'angular-web-storage';
import { MyLibModule } from 'my-lib';

export function tokenGetter() {
  return localStorage.getItem('token');
}

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  entryComponents: [ConfirmationDialogComponent, DialogComponent],
  declarations: [
    DialogComponent,
    ConfirmationDialogComponent,
    AppComponent,
    FullComponent,
    AppBlankComponent,
    AppHeaderComponent,
    AppSidebarComponent,
    LoginComponent,
    ApiLoaderComponent,
    SettingsComponent,
    ChangePasswordComponent,
    ForgotPasswordComponent,
    SignUpDetailsComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MyProfileSetModule,
    ResumeModule,
    NgxMatPopoverModule,
    ToastrModule.forRoot({
      positionClass : 'toast-top-right',
      preventDuplicates : false
    }),
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FroalaEditorModule,
    FroalaViewModule,
    MatDialogModule,
    MyLibModule,
    FlexLayoutModule,
    ImageCropperModule,
    PerfectScrollbarModule,
    HttpClientModule,
    SharedModule,
    RouterModule.forRoot(AppRoutes),
    JwtModule.forRoot({
      config: {
          tokenGetter: tokenGetter,
          whitelistedDomains: ['ownmentorcv.nolimitstalent.com'],
          blacklistedRoutes: [
             'http://ownmentorcv.nolimitstalent.com/api/login',
          ]
      }
  }),
    StorageModule.forRoot({ IDBNoWrap: true }),
  ],
  providers: [
    AuthGuard,
    LocalStorageService,
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
