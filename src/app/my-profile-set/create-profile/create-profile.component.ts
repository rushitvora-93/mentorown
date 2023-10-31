import { Component, OnInit} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileStorageModel } from '../../model/ProfileStorageModel';
import { LocalStorageService } from 'angular-web-storage';
import * as constants from '../../utils/Constants';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-create-profile',
  templateUrl: './create-profile.component.html',
  styleUrls: ['./create-profile.component.css']
})
export class CreateProfileComponent implements OnInit {
  data: ProfileStorageModel = new ProfileStorageModel();
  // id = localStorage.getItem('id');
  id;
  photo: any = 'assets/imgs/profile-male.png';
  base64Image: string;
  url;
  value;
  image = '';
  constructor(private router: Router, private route: ActivatedRoute,
              public local: LocalStorageService, private authservice: AuthService, private toastService: ToastrService,
              private authService: AuthService) {
                const urlid = this.route.snapshot.params;
                this.id = urlid.id;
              }

  ngOnInit() {
      this.getData();
      console.log('image', this.image);
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
  redirect() {
    if (this.data.first_name == null || this.data.first_name === '') {
      this.toastService.warning('First name required');
    } else if (this.data.last_name == null || this.data.last_name === '') {
      this.toastService.warning('Last name required');
    } else if (this.data.alternateEmail == null || this.data.alternateEmail === '') {
      this.toastService.warning('Email required');
    } else {
      if (this.id) {
        this.router.navigate(['/profile/profile-progress' , this.id] , { relativeTo: this.route });
      }
      this.saveApiCall();
      console.log(this.data);
      // this.local.set(constants.profileStorageModel, JSON.stringify(this.data));
    }
  }
  next() {
    if (this.data.first_name == null || this.data.first_name === '') {
      this.toastService.warning('First name required');
    } else if (this.data.last_name == null || this.data.last_name === '') {
      this.toastService.warning('Last name required');
    } else if (this.data.alternateEmail == null || this.data.alternateEmail === '') {
      this.toastService.warning('Email required');
    } else if (this.data.phone.toString().length < 8) {
      this.toastService.warning('phone number should be minimun 8 digits...');
    } else {
      if (this.id) {
        this.router.navigate(['/profile/add-skills' , this.id] , { relativeTo: this.route });
      } else {
        this.setValue(constants.profileStorageModel, JSON.stringify(this.data));
        this.router.navigate(['/profile/add-skills'] , { relativeTo: this.route });
      }
      this.saveApiCall();
      console.log(this.data);
      // this.local.set(constants.profileStorageModel, JSON.stringify(this.data));
    }
  }
  saveApiCall() {
    let data1;
    console.log('saveApiCall');
    console.log('saveApiCall', this.data.id);
    if (this.image.toString().startsWith('data:image')) {
      this.data.user_image = this.image;
      data1 = {
      first_name: this.data.first_name != null ? this.data.first_name : '',
      last_name: this.data.last_name != null ? this.data.last_name : '',
      alternateEmail: this.data.alternateEmail != null ? this.data.alternateEmail : '',
      phone: this.data.phone != null ? this.data.phone : '',
      address: this.data.address != null ? this.data.address : '',
      notify: this.data.notify,
      user_image: this.data.user_image
    };
    } else {
      data1 = {
        first_name: this.data.first_name != null ? this.data.first_name : '',
        last_name: this.data.last_name != null ? this.data.last_name : '',
        alternateEmail: this.data.alternateEmail != null ? this.data.alternateEmail : '',
        phone: this.data.phone != null ? this.data.phone : '',
        address: this.data.address != null ? this.data.address : '',
        notify: this.data.notify
      };
    }
    console.log('data:saveApiCall:', data1);
    if (this.id) {
      this.authservice.postDataReport(constants.getAndSetProfile + '/' + this.id, data1).subscribe((result => {
        console.log('resultMyProfile: ', result);
        this.setValue(constants.profileStorageModel, JSON.stringify(result.data));
      }), (error => {
        console.log('errorNewJob', error);
      }));
    } else {
      this.authservice.postDataString(constants.getAndSetProfile , data1).subscribe((result => {
        console.log('resultMyProfile: ', result);
        this.setValue(constants.profileStorageModel, JSON.stringify(result.data));
      }), (error => {
        console.log('errorNewJob', error);
      }));
    }
  }
  setValue(key: string, value: any) {
    this.local.set(key, value);
 }
  getData() {
    this.value = this.local.get(constants.profileStorageModel);
      if (this.value) {
        this.data = new ProfileStorageModel(JSON.parse((this.value).toString()));
        this.local.set(constants.profileStorageModel, JSON.stringify(this.data));
        if (this.data.user_image) {
          this.image = this.data.user_image;
        }
      }
      console.log(this.value);
  }
}
interface EventTarget { result: any; }
