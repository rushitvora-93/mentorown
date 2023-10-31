import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import * as constants from '../utils/Constants';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../services/auth.service';
import { UserLoginStorageModel } from '../model/UserLoginStorageModel';

@Component({
  selector: 'app-sign-up-details',
  templateUrl: './sign-up-details.component.html',
  styleUrls: ['./sign-up-details.component.css']
})
export class SignUpDetailsComponent implements OnInit {
id;
value;
image;
url;
loginData: UserLoginStorageModel = new UserLoginStorageModel;
  constructor(private router: Router,
              private route: ActivatedRoute,
              public local: LocalStorageService, private toastService: ToastrService, private authService: AuthService) {
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
        if (this.loginData.user_image) {
          this.image = this.loginData.user_image;
        } else {
          this.image = '';
        }
        console.log('remember', this.loginData);
      }
  }
  onSelectFile(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      // tslint:disable-next-line: no-unused-expression
      EventTarget;
      reader.readAsDataURL(event.target.files[0]); // read file as data url

      // tslint:disable-next-line: no-shadowed-variable
      reader.onload = (event) => { // called once readAsDataURL is completed
      this.url = event.target['result'].toString();
      console.log(this.url);
      this.image = (this.url).toString();
      };
    }
  }
  setValue(key: string, value: any) {
    this.local.set(key, value);
 }
 save() {
  if (this.loginData == null || this.loginData.first_name == null || this.loginData.first_name === '') {
    this.toastService.warning('First Name required');
  } else if (this.loginData.last_name === '' || this.loginData.last_name == null) {
    this.toastService.warning('Last Name required');
  } else if (this.loginData.email === '' || this.loginData.email == null) {
    this.toastService.warning('Email required');
  } else if (this.loginData.phone === '' || this.loginData.phone == null) {
    this.toastService.warning('phone number required');
  } else if (this.loginData.address === '' || this.loginData.address == null) {
    this.toastService.warning('Address is required');
  } else {
        if (this.image.toString().startsWith('data:image')) {
        this.loginData.user_image = this.image;
      } else {
        this.loginData.user_image = '';
      }
      const data = {
        first_name: this.loginData.first_name,
        last_name: this.loginData.last_name,
        email: this.loginData.email,
        phone: this.loginData.phone,
        job_title: this.loginData.job_title,
        company: this.loginData.company,
        address: this.loginData.address,
        user_image: this.loginData.user_image
      };
      console.log('image', data);
      this.authService.setLoader(true);
      this.authService.postDataReport(constants.updateUser + '/' + this.loginData.id, data).subscribe((result => {
        this.authService.setLoader(false);
        this.loginData = result.data;
        this.setValue(constants.loginUserPreference, JSON.stringify(this.loginData));
        console.log('result', result);
        this.toastService.success('profile updates successfully');
      }), (error => {
        this.authService.setLoader(false);
        console.log('errorOrganisation', error);
      }));
    }
 }
  changePassword() {
    this.router.navigate(['/change-password', this.id], { relativeTo: this.route });
   }
   back() {
     this.save();
    this.router.navigate(['/settings'], { relativeTo: this.route });
   }
}
