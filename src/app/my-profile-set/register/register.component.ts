import { Component, OnInit } from '@angular/core';
import { UserRegistrationModel } from '../../model/UserRegistrationModel';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { LocalStorageService } from 'angular-web-storage';
import { Router, ActivatedRoute } from '@angular/router';
import * as constants from '../../utils/Constants';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerdata: UserRegistrationModel = new UserRegistrationModel();
  confirmPassword?: String = '';
  constructor(private router: Router, private route: ActivatedRoute,
    public local: LocalStorageService, private authservice: AuthService, private toastService: ToastrService) { }

  ngOnInit() {
  }
  register() {
    console.log('ionViewDidLoad RegisterPage');
    if (this.registerdata == null || this.registerdata.first_name == null || this.registerdata.first_name === '') {
      this.toastService.warning('First Name required');
    } else if (this.registerdata.last_name === '' || this.registerdata.last_name == null) {
      this.toastService.warning('Last Name required');
    } else if (this.registerdata.email === '' || this.registerdata.email == null) {
      this.toastService.warning('Email required');
    } else if (this.registerdata.password === '' || this.registerdata.password == null) {
      this.toastService.warning('Password required');
    } else if (this.registerdata.password !== this.confirmPassword) {
      this.toastService.warning('Password is not match');
    } else {
      console.log(this.registerdata);
        this.authservice.postDataReport(constants.register, this.registerdata)
        .subscribe((result => {
            console.log('registerResult', result);
            this.router.navigate(['/user-list'] , { relativeTo: this.route });
        }), (error => {
          console.log('errorregister', error);
          console.log(error);
        }));
      }
  }
}
