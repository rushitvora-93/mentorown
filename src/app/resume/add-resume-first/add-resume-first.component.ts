import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ResumeModel } from '../../model/ResumeModel';
import { LocalStorageService } from 'angular-web-storage';
import * as constants from '../../utils/Constants';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-resume-first',
  templateUrl: './add-resume-first.component.html',
  styleUrls: ['./add-resume-first.component.css'],
})
export class AddResumeFirstComponent implements OnInit {
  data: ResumeModel = new ResumeModel();
  itemsExperienceLevel = [];
  itemsTypeOfRole = [];
  selectitemsrole = [];
  value;
  other;
  id;
  userID = localStorage.getItem('userId');

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public local: LocalStorageService,
    private toastService: ToastrService,
    private authService: AuthService
  ) {
    this.relavantExperience();
    // this.typeOfRole();
    const urlid = this.route.snapshot.params;
    this.id = urlid.id;
    console.log('url id', urlid.id);
  }

  ngOnInit() {
    this.getApi();
    if (this.id) {
      this.getResumeDetail();
    } else {
      this.getData();
    }
  }
  relavantExperience() {
    this.itemsExperienceLevel.push({
      title: '1 Year',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '2 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '3 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '4 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '5 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '6 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '7 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '8 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '9 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '10 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '11 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '12 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '13 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '14 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '15 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '16 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '17 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '18 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '19 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '20 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '21 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '22 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '23 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '24 Years',
      showDetails: false,
    });
    this.itemsExperienceLevel.push({
      title: '25+ Years',
      showDetails: false,
    });
  }
  // typeOfRole() {
  //   this.itemsTypeOfRole.push({
  //     title: 'Full Time',
  //     showDetails: false,
  //   });
  //   this.itemsTypeOfRole.push({
  //     title: 'Part Time',
  //     showDetails: false,
  //   });
  //   this.itemsTypeOfRole.push({
  //     title: 'Contract',
  //     showDetails: false,
  //   });
  //   this.itemsTypeOfRole.push({
  //     title: 'Shift Based',
  //     showDetails: false,
  //   });
  // }
  // clickTypeOfRole(item) {
  //   if (item.showDetails) {
  //     this.selectitemsrole.push(item.title);
  //   } else {
  //     this.selectitemsrole = [];
  //     for (let k = 0; k < this.itemsTypeOfRole.length; k++) {
  //       if (this.itemsTypeOfRole[k].showDetails) {
  //         if (item.title === this.itemsTypeOfRole[k].title) {
  //           this.itemsTypeOfRole[k].showDetails = false;
  //           this.selectitemsrole.push(this.itemsTypeOfRole[k].title);
  //         } else {
  //           this.selectitemsrole.push(this.itemsTypeOfRole[k].title);
  //         }
  //       }
  //     }
  //   }
  // }
  // saveRole() {
  //   this.other = '';
  //   this.data.tempJob = [];
  //   for (let j = 0; j < this.selectitemsrole.length; j++) {
  //     this.data.tempJob.push(this.selectitemsrole[j]);
  //   }
  //   this.data.job_type = this.selectitemsrole.toString();
  // }
  // onDone() {
  //   if (this.other) {
  //     this.data.tempJob = [];
  //     this.selectitemsrole = [];
  //     this.data.tempJob.push(this.other);
  //     this.data.job_type = this.data.tempJob.toString();
  //   }
  // }
  // discardChangesRole() {
  //   if (this.selectitemsrole) {
  //     this.itemsTypeOfRole = [];
  //     this.typeOfRole();
  //     for (let j = 0; j < this.selectitemsrole.length; j++) {
  //       for (let i = 0; i < this.itemsTypeOfRole.length; i++) {
  //         if (this.selectitemsrole[j] === this.itemsTypeOfRole[i].title) {
  //           this.itemsTypeOfRole[i].showDetails = true;
  //           break;
  //         }
  //       }
  //     }
  //     if (this.selectitemsrole.length === 1) {
  //       let count = 1;
  //       for (let i = 0; i < this.itemsTypeOfRole.length; i++) {
  //         if (this.data.job_type === this.itemsTypeOfRole[i].title) {
  //           count = 0;
  //         }
  //         if (count === 1) {
  //           this.other = this.data.job_type;
  //         } else {
  //           this.other = '';
  //         }
  //       }
  //       console.log('-------------', this.data.job_type);
  //     }
  //   }
  // }

  clickTypeOfYears(item) {
    if (item.showDetails === true) {
      let dataTitle = '';
      for (let k = 0; k < this.itemsExperienceLevel.length; k++) {
        if (item.title === this.itemsExperienceLevel[k].title) {
          this.itemsExperienceLevel[k].showDetails = true;
          console.log(this.itemsExperienceLevel[k].title);
          dataTitle = this.itemsExperienceLevel[k].title;
        } else {
          this.itemsExperienceLevel[k].showDetails = false;
        }
        this.data.experience = dataTitle;
      }
    } else {
      const dataTitle = '';
      for (let k = 0; k < this.itemsExperienceLevel.length; k++) {
        this.itemsExperienceLevel[k].showDetails = false;
      }
      this.data.experience = dataTitle;
    }
  }
  selected() {
    if (this.data.experience) {
      for (let i = 0; i < this.itemsExperienceLevel.length; i++) {
        if (this.data.experience === this.itemsExperienceLevel[i].title) {
          this.itemsExperienceLevel[i].showDetails = true;
        }
      }
    }
  }
  getApi() {
    this.authService.setLoader(false);
    this.authService
      .getData(constants.getAndSetProfile + '/' + this.userID)
      .subscribe(
        (result) => {
          console.log('API:getProfile:DATA:', result.data);
          this.setValue(
            constants.profileStorageModel,
            JSON.stringify(result.data)
          );
        },
        (error) => {
          this.authService.setLoader(false);
          console.log('error', error);
        }
      );
  }
  getResumeDetail() {
    this.value = this.local.get(constants.resumeModel);
    if (this.value) {
      this.getData();
    } else {
      this.authService.setLoader(true);
      this.authService
        .getDataWithoutString(constants.getAndSetResume + '/' + this.id)
        .subscribe(
          (result) => {
            this.data = result.data;
            this.setValue(constants.resumeModel, JSON.stringify(this.data));
            console.log('new data', this.data);
            this.authService.setLoader(false);
            // this.setRole(result.data);
          },
          (err) => {
            console.log(err);
            this.authService.setLoader(false);
          });
      }
  }
  getData() {
    if (this.id) {
      this.getDataEdit();
    } else {
      this.value = this.local.get(constants.resumeModel);
      if (this.value) {
        this.data = new ResumeModel(JSON.parse(this.value.toString()));
        this.local.set(constants.resumeModel, JSON.stringify(this.data));
      }
      console.log(this.value);
    }
  }
  getDataEdit() {
    this.value = this.local.get(constants.resumeModel);
    if (this.value) {
      this.data = new ResumeModel(JSON.parse(this.value.toString()));
      this.local.set(constants.resumeModel, JSON.stringify(this.data));
    }
    console.log(this.value);
    // this.setRole(this.data);
  }
  // setRole(result) {
  //   let count = 1;
  //   if (result.job_type != null) {
  //     let jobTypeDATA = result.job_type;
  //     jobTypeDATA = jobTypeDATA.toString().replace(']', '');
  //     const jobTypeDATAArray = jobTypeDATA.split(',');
  //     console.log('jobtype', jobTypeDATAArray);
  //     if (jobTypeDATAArray.length === 1) {
  //       for (let i = 0; i < this.itemsTypeOfRole.length; i++) {
  //         if (jobTypeDATAArray === this.itemsTypeOfRole[i].title) {
  //           count = 0;
  //           break;
  //         }
  //       }
  //       if (count === 1) {
  //         this.other = result.job_type;
  //         this.data.job_type =  this.other;
  //       } else {
  //         this.selectitemsrole.push(jobTypeDATAArray[0]);
  //         this.data.job_type =  this.selectitemsrole.toString();
  //       }
  //     } else {
  //       for (let i = 0; i < jobTypeDATAArray.length; i++) {
  //         this.selectitemsrole.push(jobTypeDATAArray[i]);
  //       }
  //       this.data.job_type =  this.selectitemsrole.toString();
  //     }
  //   }
  // }
  setValue(key: string, value: any) {
    this.local.set(key, value);
  }
  next() {
    if (this.data.job_title == null || this.data.job_title === '') {
      this.toastService.warning('Job title required');
    } else {
      if (this.id) {
        this.setValue(constants.resumeModel, JSON.stringify(this.data));
        console.log(this.data);
        this.router.navigate(['/resume/resume-second', this.id], {
          relativeTo: this.route,
        });
      } else {
        this.setValue(constants.resumeModel, JSON.stringify(this.data));
        console.log(this.data);
        this.router.navigate(['/resume/resume-second'], {
          relativeTo: this.route,
        });
      }
    }
    // else {
    //   this.setValue(constants.resumeModel, JSON.stringify(this.data));
    //   console.log(this.data);
    // }
  }
}
