import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DemoMaterialModule } from '../demo-material-module';

import { MyProfileSetRoutingModule } from './my-profile-set-routing.module';
import { MyProfileComponent } from './my-profile/my-profile.component';
import { CreateProfileComponent } from './create-profile/create-profile.component';
import { AddPreferencesComponent } from './add-preferences/add-preferences.component';
import { AddSkillsComponent } from './add-skills/add-skills.component';
import { AddExperiencesComponent } from './add-experiences/add-experiences.component';
import { AddAchievementsComponent } from './add-achievements/add-achievements.component';
import { ExperienceDescComponent } from './add-experiences/experience-desc/experience-desc.component';
import { AchievementDescComponent } from './add-achievements/achievement-desc/achievement-desc.component';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
import { NgxMatPopoverModule } from 'ngx-mat-popover';
import { RegisterComponent } from './register/register.component';


@NgModule({
  declarations: [MyProfileComponent, CreateProfileComponent, AddPreferencesComponent, AddSkillsComponent, AddExperiencesComponent,
                AddAchievementsComponent, ExperienceDescComponent, AchievementDescComponent, RegisterComponent],
  imports: [
    CommonModule,
    MyProfileSetRoutingModule,
    DemoMaterialModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMatPopoverModule
  ]
})
export class MyProfileSetModule { }
