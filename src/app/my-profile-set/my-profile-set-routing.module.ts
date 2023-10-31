import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { AuthGuard } from '../guards/auth.guard';
import { AddSkillsComponent } from './add-skills/add-skills.component';
import { AddPreferencesComponent } from './add-preferences/add-preferences.component';
import { AddExperiencesComponent } from './add-experiences/add-experiences.component';
import { AddAchievementsComponent } from './add-achievements/add-achievements.component';
import { ExperienceDescComponent } from './add-experiences/experience-desc/experience-desc.component';
import { AchievementDescComponent } from './add-achievements/achievement-desc/achievement-desc.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
  {
    path: 'profile-progress',
    canActivate: [AuthGuard],
    component: MyProfileComponent,
    data: { title: 'profile' }
  },
  {
    path: 'profile-progress/:id',
    canActivate: [AuthGuard],
    component: MyProfileComponent,
    data: { title: 'profile' }
  },
  {
    path: 'create-profile',
    canActivate: [AuthGuard],
    component: CreateProfileComponent,
    data: { title: 'create-profile' }
  },
  {
    path: 'create-profile/:id',
    canActivate: [AuthGuard],
    component: CreateProfileComponent,
    data: { title: 'create-profile' }
  },
  {
    path: 'add-skills',
    canActivate: [AuthGuard],
    component: AddSkillsComponent,
    data: { title: 'add-skills' }
  },
  {
    path: 'add-skills/:id',
    canActivate: [AuthGuard],
    component: AddSkillsComponent,
    data: { title: 'add-skills' }
  },
  {
    path: 'add-preferences',
    canActivate: [AuthGuard],
    component: AddPreferencesComponent,
    data: { title: 'add-preferences' }
  },
  {
    path: 'add-preferences/:id',
    canActivate: [AuthGuard],
    component: AddPreferencesComponent,
    data: { title: 'add-preferences' }
  },
  {
    path: 'add-experiences',
    canActivate: [AuthGuard],
    component: AddExperiencesComponent,
    data: { title: 'add-experiences' }
  },
  {
    path: 'add-experiences/:id',
    canActivate: [AuthGuard],
    component: AddExperiencesComponent,
    data: { title: 'add-experiences' }
  },
  {
    path: 'add-achievements',
    canActivate: [AuthGuard],
    component: AddAchievementsComponent,
    data: { title: 'add-achievements' }
  },
  {
    path: 'add-achievements/:id',
    canActivate: [AuthGuard],
    component: AddAchievementsComponent,
    data: { title: 'add-achievements' }
  },
  {
    path: 'experience-desc',
    canActivate: [AuthGuard],
    component: ExperienceDescComponent,
    data: { title: 'experience-desc' }
  },
  {
    path: 'experience-desc/:id',
    canActivate: [AuthGuard],
    component: ExperienceDescComponent,
    data: { title: 'experience-desc' }
  },
  {
    path: 'achievement-desc',
    canActivate: [AuthGuard],
    component: AchievementDescComponent,
    data: { title: 'achievement-desc' }
  },
  {
    path: 'achievement-desc/:id',
    canActivate: [AuthGuard],
    component: AchievementDescComponent,
    data: { title: 'achievement-desc' }
  },
  {
    path: 'create-new-user',
    canActivate: [AuthGuard],
    component: RegisterComponent,
    data: { title: 'create-new-user' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyProfileSetRoutingModule { }
