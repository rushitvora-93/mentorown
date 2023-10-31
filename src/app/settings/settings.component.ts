import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { HelpDataModel } from '../model/HelpDataModel';
import { LocalStorageService } from 'angular-web-storage';
import * as constants from '../utils/Constants';
import { ActivatedRoute, Router } from '@angular/router';
import { UserLoginStorageModel } from '../model/UserLoginStorageModel';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  loginData: UserLoginStorageModel = new UserLoginStorageModel();
  helpdata: HelpDataModel = new HelpDataModel();
  value;
  value1;
  id;
  userEmail = localStorage.getItem('setting_email');
  constructor( public local: LocalStorageService, private toastService: ToastrService, private router: Router,
               private route: ActivatedRoute,
               private authService: AuthService) {
                const urlid = this.route.snapshot.params;
                this.id = urlid.id;
                console.log('url id', urlid.id);
                }

  ngOnInit() {
    // this.getData();
    this.getApi();
  }
  getData() {
    this.value = this.local.get(constants.helpDataModel);
    if (this.value) {
      this.helpdata = new HelpDataModel(JSON.parse((this.value).toString()));
      this.local.set(constants.helpDataModel, JSON.stringify(this.helpdata));
    }
    console.log(this.value);
    this.helpdata.email = this.userEmail;
  }
  setValue(key: string, value: any) {
    this.local.set(key, value);
 }
 getApi() {
  this.authService.setLoader(true);
  this.authService.getData(constants.getAndSetProfile + '/' + this.id).subscribe((result => {
    console.log('API:getProfile:DATA:', result.data);
    this.setValue(constants.loginUserPreference, JSON.stringify(result.data));
    this.authService.setLoader(false);
  }), (error => {
    console.log('error', error);
  }));
}
 changePassword() {
  this.router.navigate(['/change-password', this.id], { relativeTo: this.route });
 }
 signInDetails() {
  this.router.navigate(['/sign-up-details' , this.id], { relativeTo: this.route });
 }
  // send() {
  //   console.log('HelpPage');
  //   if (this.helpdata == null || this.helpdata.email == null || this.helpdata.email === '') {
  //     this.toastService.warning('Email required');
  //   } else if (this.helpdata.subject === '' || this.helpdata.subject == null) {
  //     this.toastService.warning('Subject required');
  //   } else if (this.helpdata.description === '' || this.helpdata.description == null) {
  //     this.toastService.warning('Description required');
  //   } else {
  //     this.local.set(constants.helpDataModel, JSON.stringify(this.helpdata));
  //     }
  // }
}
