import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileStorageModel } from '../../model/ProfileStorageModel';
import { LocalStorageService } from 'angular-web-storage';
import * as constants from '../../utils/Constants';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../material-component/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-add-experiences',
  templateUrl: './add-experiences.component.html',
  styleUrls: ['./add-experiences.component.css']
})
export class AddExperiencesComponent implements OnInit {
  data: ProfileStorageModel = new ProfileStorageModel;
  id;
  value;
  expDataArray = [];
  constructor(private router: Router, private route: ActivatedRoute, public local: LocalStorageService, private authservice: AuthService,
              private dialog: MatDialog) {
    const urlid = this.route.snapshot.params;
    this.id = urlid.id;
    if (this.id) {
      localStorage.setItem('pass_id' , this.id);
    }
  }

  ngOnInit() {
    this.getData();
    console.log(this.data);
  }
  getData() {
    this.value = this.local.get(constants.profileStorageModel);
    this.data = new ProfileStorageModel(JSON.parse((this.value).toString()));
    // this.value = JSON.parse(JSON.stringify(this.data));
    this.expDataArray = this.data.experience;
    console.log('New Array', this.expDataArray);
    console.log(this.data);
  }
  saveApiCall() {
    let data1: any;

    data1 = {
      first_name: this.data.first_name,
      last_name: this.data.last_name,
      alternateEmail: this.data.alternateEmail,
      experience: this.data.experience.length > 0 ? this.data.experience : [],
    };
    console.log('data', data1);
    // this.showLoader();
    this.authservice.postDataString(constants.getAndSetProfile + '/' + this.id, data1).subscribe((result => {
      this.local.set(constants.profileStorageModel, JSON.stringify(result.data));
      // this.dismissLoader();
      console.log('Experiences: ', result);
    }), (error => {
      // this.dismissLoader();
      console.log('errorNewJob', error);
    }));
  }
  setValue(key: string, value: any) {
    this.local.set(key, value);
 }
 openDialog(index) {
   console.log(index);
  const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
    data: {
      message: 'Are you sure want to delete?',
      buttonText: {
        ok: 'Yes',
        cancel: 'No'
      }
    }
  });

  dialogRef.afterClosed().subscribe((confirmed: boolean) => {
    if (confirmed) {
      this.delete(index);
    }
  });
 }
 delete(index) {
   this.data.experience.splice(index , 1);
  //  this.data.experience = this.expDataArray;
   console.log('After delete', this.data.experience);
   this.local.set(constants.profileStorageModel, JSON.stringify(this.data));
 }
  goto_exp_desc(id) {
    this.setValue(constants.profileStorageModel, JSON.stringify(this.data));
    this.router.navigate(['/profile/experience-desc', id ], { relativeTo: this.route });
  }
  experience() {
    this.router.navigate(['/profile/experience-desc'], { relativeTo: this.route });
  }
  redirect() {
    this.saveApiCall();
    if (this.id) {
      this.router.navigate(['/profile/profile-progress', this.id], {
        relativeTo: this.route,
      });
    }
  }
  next() {
    this.saveApiCall();
    if (this.id) {
      this.router.navigate(['/profile/add-achievements' , this.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['/profile/add-achievements'], { relativeTo: this.route });
    }
  }
  back() {
    this.saveApiCall();
    if (this.id) {
      this.router.navigate(['/profile/add-preferences' , this.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['/profile/add-preferences'], { relativeTo: this.route });
    }
  }
}
