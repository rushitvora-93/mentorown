import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileStorageModel } from '../../model/ProfileStorageModel';
import { LocalStorageService } from 'angular-web-storage';
import * as constants from '../../utils/Constants';
import { AuthService } from '../../services/auth.service';
import { MatDialog } from '@angular/material';
import { ConfirmationDialogComponent } from '../../material-component/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-add-achievements',
  templateUrl: './add-achievements.component.html',
  styleUrls: ['./add-achievements.component.css']
})
export class AddAchievementsComponent implements OnInit {
  data: ProfileStorageModel = new ProfileStorageModel;
  id;
  value;
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

  }
  getData() {
    this.value = this.local.get(constants.profileStorageModel);
    this.data = new ProfileStorageModel(JSON.parse((this.value).toString()));
    console.log(this.data);
  }
  saveApiCall() {
    let data1: any;

    data1 = {
      first_name: this.data.first_name,
      last_name: this.data.last_name,
      alternateEmail: this.data.alternateEmail,
      achievements: this.data.achievements.length > 0 ? this.data.achievements : []
    };
    console.log('data', data1);
    // this.showLoader();
    this.authservice.postDataString(constants.getAndSetProfile + '/' + this.id, data1).subscribe((result => {
      // this.dismissLoader();
      console.log('Achievements: ', result);
      this.setValue(constants.profileStorageModel, JSON.stringify(result.data));
    }), (error => {
      // this.dismissLoader();
      console.log('errorNewJob', error);
    }));
  }
  setValue(key: string, value: any) {
    this.local.set(key, value);
 }
 goto_Achieve_desc(item = 'null') {
    this.setValue(constants.profileStorageModel, JSON.stringify(this.data));
    this.router.navigate(['/profile/achievement-desc', item ], { relativeTo: this.route });
  }
  achievement() {
    this.router.navigate(['/profile/achievement-desc'], { relativeTo: this.route });
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
    this.data.achievements.splice(index , 1);
   //  this.data.experience = this.expDataArray;
    console.log('After delete', this.data.achievements);
    this.local.set(constants.profileStorageModel, JSON.stringify(this.data));
  }
  redirect() {
    this.setValue(constants.profileStorageModel, JSON.stringify(this.data));
    this.saveApiCall();
    if (this.id) {
      this.router.navigate(['/profile/profile-progress', this.id], {
        relativeTo: this.route,
      });
    }
  }
  save() {
    this.setValue(constants.profileStorageModel, JSON.stringify(this.data));
    this.saveApiCall();
    if (this.id) {
      this.router.navigate(['/profile/profile-progress' , this.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['/user-list'], { relativeTo: this.route });
    }
  }
  back() {
    this.setValue(constants.profileStorageModel, JSON.stringify(this.data));
    this.saveApiCall();
    if (this.id) {
      this.router.navigate(['/profile/add-experiences' , this.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['/profile/add-experiences'], { relativeTo: this.route });
    }
  }
}
