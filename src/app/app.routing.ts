import { Routes } from '@angular/router';

import { FullComponent } from './layouts/full/full.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { SettingsComponent } from './settings/settings.component';
import { ChangePasswordComponent } from './settings/change-password/change-password.component';
import { ForgotPasswordComponent } from './settings/forgot-password/forgot-password.component';
import { SignUpDetailsComponent } from './sign-up-details/sign-up-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
// import { UserJobsComponent } from './user-jobs/user-jobs.component';
export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
    data: { title: 'Login' },
  },
  {
    path: '',
    component: FullComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'material',
        loadChildren:
          './material-component/material.module#MaterialComponentsModule',
      },
      {
        path: 'profile',
        loadChildren:
          './my-profile-set/my-profile-set.module#MyProfileSetModule',
      },
      {
        path: 'resume',
        loadChildren: './resume/resume.module#ResumeModule',
      },
      {
        path: 'user-list',
        loadChildren: './user-list/user-list.module#UserListModule',
      },
      {
        path: 'settings/:id',
        component: SettingsComponent,
      },
      {
        path: 'change-password/:id',
        component: ChangePasswordComponent,
        data: { title: 'change-password' },
      },
      {
        path: 'forgot-password',
        component: ForgotPasswordComponent,
        data: { title: 'forgot-password' },
      },
      {
        path: 'sign-up-details/:id',
        component: SignUpDetailsComponent,
        data: { title: 'sign-up-details' },
      },
      {
        path: 'icons',
        loadChildren: './icons/mat-icon.module#IconsModule',
      },
    ],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    data: { title: 'not-found' },
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];
