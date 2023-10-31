import { Component, AfterViewInit, ViewChild, ChangeDetectorRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { MatPaginator, PageEvent, MatTableDataSource, MatSort } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import * as constants from '../../utils/Constants';
import { ProfileProgressStorageModel } from '../../model/ProfileProgressModel';
import { UserLoginStorageModel } from '../../model/UserLoginStorageModel';
import { LocalStorageService } from 'angular-web-storage';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {
  dataProgress: ProfileProgressStorageModel = new ProfileProgressStorageModel();
  loginData: UserLoginStorageModel = new UserLoginStorageModel;
  id;
  value;
  aboutDEG;
  aboutDEGFill = 'none';
  skillDEG;
  skillDEGFill = 'none';
  preferenceDEG;
  preferenceDEGFill = 'none';
  experienceDEG;
  experienceDEGFill = 'none';
  achievementDEG;
  achievementDEGFill = 'none';


  constructor(private router: Router,
    private toastService: ToastrService,
    private route: ActivatedRoute,
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    public local: LocalStorageService) { }

  ngOnInit() {
    const urlid = this.route.snapshot.params;
    this.id = urlid.id;
    console.log('url id',  urlid.id);
    this.getData();
    this.getDataStorage();
    this.getApi();
  }
  getDataStorage() {
    this.value = this.local.get(constants.loginUserPreference);
      if (this.value) {
        this.loginData = new UserLoginStorageModel(JSON.parse(this.value.toString()));
        console.log('remember', this.loginData);
      }
  }
  getData() {
    console.log('getDATA');
    console.log('getDATA',  this.id);
    this.authService.getData(constants.getProfileprogress + this.id).subscribe((result => {
      console.log('API:getProfileProgress:DATA:', result.about);
      this.dataProgress.about = result.about;
      this.aboutDEG = 'rotate(' + (360 / 100 * result.about).toString() + 'deg)';
      if (result.about > 50 ) {
        this.aboutDEGFill = this.aboutDEG;
      }
      this.dataProgress.skill = result.skill;
      this.skillDEG = 'rotate(' + (360 / 100 * result.skill).toString() + 'deg)';
      if (result.skill > 50 ) {
        this.skillDEGFill = this.skillDEG;
      }
      this.dataProgress.preference = result.preference;
      this.preferenceDEG = 'rotate(' + (360 / 100 * result.preference).toString() + 'deg)';
      if (result.preference > 50 ) {
        this.preferenceDEGFill = this.preferenceDEG;
      }
      this.dataProgress.experience = result.experience;
      this.experienceDEG = 'rotate(' + (360 / 100 * result.experience).toString() + 'deg)';
      if (result.experience > 50 ) {
        this.experienceDEGFill = this.experienceDEG;
      }
      this.dataProgress.achievement = result.achievement;
      this.achievementDEG = 'rotate(' + (360 / 100 * result.achievement).toString() + 'deg)';
      if (result.achievement > 50 ) {
        this.achievementDEGFill = this.achievementDEG;
      }
    }), (error => {
      console.log('error', error);
    }));
  }
  getApi() {
    this.authService.setLoader(true);
    this.authService.getData(constants.getAndSetProfile + '/' + this.id).subscribe((result => {
      console.log('API:getProfile:DATA:', result.data);
      this.setValue(constants.profileStorageModel, JSON.stringify(result.data));
      this.getData();
      this.authService.setLoader(false);
    }), (error => {
      console.log('error', error);
    }));
  }
  setValue(key: string, value: any) {
    this.local.set(key, value);
 }
  gotoaboutpage() {
    this.router.navigate(['/profile/create-profile' , this.id], { relativeTo: this.route });
  }
  gotoskillpage() {
    this.router.navigate(['/profile/add-skills' , this.id], { relativeTo: this.route });
  }

  gotopreferencespage() {
    this.router.navigate(['/profile/add-preferences' , this.id], { relativeTo: this.route });
  }

  gotoexperiencepage() {
    this.router.navigate(['/profile/add-experiences' , this.id], { relativeTo: this.route });
  }

  gotoachievementpage() {
    this.router.navigate(['/profile/add-achievements' , this.id], { relativeTo: this.route });
  }
  redirect() {
    this.router.navigate(['/user-list'] , { relativeTo: this.route });
  }
  addProfile() {
    this.router.navigate(['./create-profile' , this.id], { relativeTo: this.route });
  }
}


