import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserResetPasswordModel } from '../../model/UserResetPasswordModel';
import { LocalStorageService } from 'angular-web-storage';
import * as constants from '../../utils/Constants';
import { UserLoginStorageModel } from '../../model/UserLoginStorageModel';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {
  loginData: UserLoginStorageModel = new UserLoginStorageModel();
  data: UserResetPasswordModel = new UserResetPasswordModel();
  confirmPassword?: String = '';
  id;
  value;
  constructor(private router: Router,
              private route: ActivatedRoute, public local: LocalStorageService,
              private toastService: ToastrService,  private authService: AuthService) {
                const urlid = this.route.snapshot.params;
                this.id = urlid.id;
                console.log('url id', urlid.id);
               }

  ngOnInit() {
    this.getData();
  }
  getData() {
    this.value = this.local.get(constants.loginUserPreference);
      if (this.value) {
        this.loginData = new UserLoginStorageModel(JSON.parse(this.value.toString()));
        console.log('remember', this.loginData);
      }
    console.log(this.value);
    this.data.email = this.loginData.email;
  }
  save() {
    if (this.data.current_password == null || this.data.current_password === '') {
      this.toastService.warning('Current Password required');
    } else if (this.data.password == null || this.data.password === '') {
      this.toastService.warning('Password required');
    } else if (this.data.password !== this.confirmPassword) {
      this.toastService.warning('Password does not Match');
    } else {
      console.log('new password', this.data);
      this.authService.setLoader(true);
      this.authService.postDataReport(constants.changepassword, this.data )
      .subscribe((result => {
          console.log('result', result);
          this.authService.setLoader(false);
          this.toastService.success(result.message);
      }), (error => {
        this.authService.setLoader(false);
        console.log('errorChangePassword', error);
      }));
    }
  }
  forgotPassword() {
    this.router.navigate(['/forgot-password'], { relativeTo: this.route });
  }
}
