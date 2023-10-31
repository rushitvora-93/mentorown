import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocalStorageService } from 'angular-web-storage';
import { UserRememberStorageModel } from '../model/UserRememberStorageModel';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  rememberMode: UserRememberStorageModel = new UserRememberStorageModel();
  value;
  loginForm: FormGroup;
  loginFormErrors: any;

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder, private toast: ToastrService,
              public local: LocalStorageService) {
    this.loginFormErrors = {
      email: {},
      password: {}
    };
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(() => {
      this.onLoginFormValuesChanged();
    });
  }

  setValue(key: string, value: any) {
    this.local.set(key, value);
 }
 onSubmit(data) {
   if (data.email === 'admin@ownmentorcv.com') {
    this.authService.setLoader(true);
    const body = new URLSearchParams();
    body.set('email', data.email);
    body.set('password', data.password);
    this.authService.postData('login', body.toString()).subscribe(response => {
      this.authService.setLoader(false);
      if (response.data) {
        const res = response.data;
        console.log( res.id);
        localStorage.setItem('id', res.id);
        localStorage.setItem('token', res.token);
        localStorage.setItem('email', res.email);
        localStorage.setItem('firstName', res.first_name);
        localStorage.setItem('pass', data.password);
        this.router.navigateByUrl('/user-list');
      }
    }, error => {
        this.authService.setLoader(false);
        this.toast.error(error);
      });
   } else {
    this.toast.error('User Not Authenticated');
   }
}
onLoginFormValuesChanged() {
  for (const field in this.loginFormErrors) {
    if (!this.loginFormErrors.hasOwnProperty(field)) {
      continue;
    }

    // Clear previous errors
    this.loginFormErrors[field] = {};

    // Get the control
    const control = this.loginForm.get(field);

    if (control && control.dirty && !control.valid) {
      this.loginFormErrors[field] = control.errors;
    }
  }
}
}

