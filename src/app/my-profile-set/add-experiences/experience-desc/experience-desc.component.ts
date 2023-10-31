import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileStorageModel } from '../../../model/ProfileStorageModel';
import { ProfileExperienceModel } from '../../../model/ProfileExperienceModel';
import * as constants from '../../../utils/Constants';
import {MomentDateAdapter, MAT_MOMENT_DATE_ADAPTER_OPTIONS} from '@angular/material-moment-adapter';
import {DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE} from '@angular/material/core';
import {MatDatepicker} from '@angular/material/datepicker';
import { FormControl, FormBuilder, FormGroup } from '@angular/forms';
import * as _moment from 'moment';
import { Moment} from 'moment';
import { LocalStorageService } from 'angular-web-storage';

const moment =  _moment;

export const MY_FORMATS = {
  display: {
    dateInput: 'YYYY-MM',
    monthYearLabel: 'MMM YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

@Component({
  selector: 'app-experience-desc',
  templateUrl: './experience-desc.component.html',
  styleUrls: ['./experience-desc.component.css'],
    providers: [
      {
        provide: DateAdapter,
        useClass: MomentDateAdapter,
        deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS]
      },

      {provide: MAT_DATE_FORMATS, useValue: MY_FORMATS},
    ]
})
export class ExperienceDescComponent implements OnInit {
  data: ProfileStorageModel = new ProfileStorageModel;
  experienceData: ProfileExperienceModel = new ProfileExperienceModel;
  itemsTypeOfJob: Array<{title: string, showDetails: boolean}> = [];
  industryListData: Array<{title: string, showDetails: boolean}> = [];
  industry;
  headline;
  showFirst = false;
  showSecond = false;
  selectitemsjob = [];
  selectitemsindustry;
  experienceDatas = [];
  end = new FormControl(moment());
  start = new FormControl(moment());
  response;
  temp = [];
  other;
  lbl_start;
  update;
  start_date = true;
  lbl_end;
  end_date = true;
  redirect_id = localStorage.getItem('pass_id');
  constructor(private router: Router, private route: ActivatedRoute, public local: LocalStorageService) {
    const urlid = this.route.snapshot.params;
    this.EmployementType();
    this.IndustryType();
   }

  ngOnInit() {
    this.getData();
    const id = this.route.snapshot.params;
    this.updatedata(id);
  }
  EmployementType() {
    this.itemsTypeOfJob.push({
      title: 'Full Time',
      showDetails: false
    });
    this.itemsTypeOfJob.push({
      title: 'Part Time',
      showDetails: false
    });
    this.itemsTypeOfJob.push({
      title: 'Contract',
      showDetails: false
    });
    this.itemsTypeOfJob.push({
      title: 'Shift Based',
      showDetails: false
    });
  }
  IndustryType() {
    this.industryListData.push({
      title: 'Accounting',
      showDetails: false
    });
    this.industryListData.push({
      title: 'Banking',
      showDetails: false
    });
    this.industryListData.push({
      title: 'Civil Engineering',
      showDetails: false
    });
    this.industryListData.push({
      title: 'Computer Hardware',
      showDetails: false
    });
    this.industryListData.push({
      title: 'Computer Networking',
      showDetails: false
    });
    this.industryListData.push({
      title: 'Computer Software',
      showDetails: false
    });

  }
  clickTypeOfJob(item) {
    if (item.showDetails) {
      // this.selectitemsjob = [];
      this.selectitemsjob.push(item.title);
    } else {
      this.selectitemsjob = [];
      for (let k = 0; k < this.itemsTypeOfJob.length; k++) {
        if (this.itemsTypeOfJob[k].showDetails) {
          if (item.title === this.itemsTypeOfJob[k].title) {
            this.itemsTypeOfJob[k].showDetails = false;
            this.selectitemsjob.push(this.itemsTypeOfJob[k].title);
          } else {
            this.selectitemsjob.push(this.itemsTypeOfJob[k].title);
          }
        }
      }
    }
  }
  saveJob() {
    this.experienceData.tempJobType = [];
    this.other = '';
    for (let j = 0; j < this.selectitemsjob.length; j++) {
      this.experienceData.tempJobType.push(this.selectitemsjob[j]);
    }
    this.experienceData.typeOfJob = this.experienceData.tempJobType.toString();
  }
  onDone() {
    if (this.other) {
      this.experienceData.tempJobType = [];
      this.selectitemsjob = [];
      this.experienceData.tempJobType.push(this.other);
      this.experienceData.typeOfJob = this.experienceData.tempJobType.toString();
    }
  }
  discardChangesJob() {
    if (this.selectitemsjob) {
      this.itemsTypeOfJob = [];
      this.EmployementType();
      for (let j = 0; j < this.selectitemsjob.length; j++) {
        for (let i = 0; i < this.itemsTypeOfJob.length; i++) {
          if (this.selectitemsjob[j] === this.itemsTypeOfJob[i].title) {
            this.itemsTypeOfJob[i].showDetails = true;
            break;
          }
        }
      }
      if (this.selectitemsjob.length === 1) {
        let count = 1;
        for (let i = 0; i < this.itemsTypeOfJob.length; i++) {
          if (this.experienceData.typeOfJob === this.itemsTypeOfJob[i].title) {
            count = 0;
          }
          if (count === 1) {
            this.other = this.experienceData.typeOfJob;
          } else {
            this.other = '';
          }
        }
      }
    }
  }
  clickTypeOfJobIndustry(item) {
    if (item.showDetails) {
      let dataTitle = '';
      for (let k = 0; k < this.industryListData.length; k++) {
        if (item.title === this.industryListData[k].title) {
          this.industryListData[k].showDetails = true;
          console.log(this.industryListData[k].title);
          dataTitle = this.industryListData[k].title;
      } else {
        this.industryListData[k].showDetails = false;
      }
      this.experienceData.industry = dataTitle;
      }
    } else {
      const dataTitle = '';
      for (let k = 0; k < this.industryListData.length; k++) {
        this.industryListData[k].showDetails = false;
      }
      this.experienceData.industry = dataTitle;
    }
  }
  selectedType() {
    if (this.experienceData.industry) {
      for (let i = 0; i < this.industryListData.length; i++) {
        if (this.experienceData.industry === this.industryListData[i].title) {
          this.industryListData[i].showDetails = true;
        }
      }
    }
  }
  chosenYearHandlerEndDate(normalizedYear: Moment) {
    console.log(this.end.value);
    const ctrlValue = this.end.value;
    ctrlValue.year(normalizedYear.year());
    this.end.setValue(ctrlValue);
  }
  chosenMonthHandlerEndDate(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    this.end_date = false;
    const ctrlValue = this.end.value;
    ctrlValue.month(normalizedMonth.month());
    this.end.setValue(ctrlValue);
    datepicker.close();
    const endDate = (this.end.value).toString();
    this.onChangeEndDate(endDate);
  }
  onChangeEndDate(val) {
    const d = new Date(val);
    const date = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2)].join('-');
    console.log(date);
    this.experienceData.endMonthYear = date;
    console.log('final end date', this.experienceData.endMonthYear);
  }
  chosenYearHandlerStartDate(normalizedYear: Moment) {
    const ctrlValue = this.start.value;
    ctrlValue.year(normalizedYear.year());
    this.start.setValue(ctrlValue);
  }
  chosenMonthHandlerStartDate(normalizedMonth: Moment, datepicker: MatDatepicker<Moment>) {
    this.start_date = false;
    const ctrlValue = this.start.value;
    ctrlValue.month(normalizedMonth.month());
    this.start.setValue(ctrlValue);
    datepicker.close();
    const startDate = (this.start.value).toString();
    this.onChangeStartDate(startDate);
  }
  onChangeStartDate(val) {
    const d = new Date(val);
    const date = [d.getFullYear(), ('0' + (d.getMonth() + 1)).slice(-2)].join('-');
    console.log(date);
    this.experienceData.startMonthYear = date;
  }

  updatedata(id) {
    this.update = true;
    this.temp = this.data.experience;
    for (let i = 0 ; i < this.temp.length; i++) {
      if ( this.temp[i].id === id.id) {
        this.experienceData = this.temp[i];
        console.log('----------------', this.experienceData);
        this.lbl_start = this.experienceData.startMonthYear;
        this.lbl_end = this.experienceData.endMonthYear;
        // let endDate = new Date((this.experienceData.endMonthYear).toString());
        // var momentVariable = moment(endDate, 'YYYY-MM');
        // var stringvalue = momentVariable.format('YYYY-MM');
        // this.end.patchValue(stringvalue);
      }
    }
    this.setExperience();
  }
  setExperience() {
    // this.end. =  this.experienceData.endMonthYear;
    this.selectitemsjob = [];
    if (this.experienceData.typeOfJob != null) {
      let jobTypeDATA = this.experienceData.typeOfJob;
      jobTypeDATA = jobTypeDATA.toString().replace(']', '');
      const jobTypeDATAArray = jobTypeDATA.split(',');
      console.log('jobtype', jobTypeDATAArray);
      console.log('temporary data', this.experienceData.typeOfJob);
      let count = 1;
      if (jobTypeDATAArray.length === 1) {
        for (let i = 0; i < this.itemsTypeOfJob.length; i++) {
          if (jobTypeDATAArray[0] === this.itemsTypeOfJob[i].title) {
            count = 0;
            break;
          }
        }
        if (count === 1) {
          this.other = this.experienceData.typeOfJob;
          this.experienceData.typeOfJob = this.other;
        } else {
          this.selectitemsjob.push(jobTypeDATAArray[0]);
          this.experienceData.typeOfJob =  this.selectitemsjob.toString();
        }
      } else {
        for (let i = 0; i < jobTypeDATAArray.length; i++) {
          this.selectitemsjob.push(jobTypeDATAArray[i]);
        }
        this.experienceData.typeOfJob =  this.selectitemsjob.toString();
      }
    }
  }
  getData() {
    this.response = this.local.get(constants.profileStorageModel);
      if (this.response) {
        this.data = new ProfileStorageModel(JSON.parse(this.response.toString()));
        if (this.data.experience) {
          this.experienceDatas = this.data.experience;
          console.log(this.experienceDatas);
        }
        console.log('data====================', this.data);
      }
  }
  save() {
    const experienceDATA: object = {
      company: this.experienceData.company != null ? this.experienceData.company : '',
      currentlyWorking: this.experienceData.currentlyWorking != null ? this.experienceData.currentlyWorking : '',
      description: this.experienceData.description != null ? this.experienceData.description : '',
      endMonthYear: this.experienceData.endMonthYear != null ? this.experienceData.endMonthYear : '',
      headline: this.experienceData.headline != null ? this.experienceData.headline : '',
      id: this.experienceData.id != null ? this.experienceData.id : '',
      industry: this.experienceData.industry != null ? this.experienceData.industry : '',
      location: this.experienceData.location != null ? this.experienceData.location : '',
      myHedlineChecked: this.experienceData.myHedlineChecked != null ? this.experienceData.myHedlineChecked : '',
      myIndustryChecked: this.experienceData.myIndustryChecked != null ? this.experienceData.myIndustryChecked : '',
      startMonthYear: this.experienceData.startMonthYear != null ? this.experienceData.startMonthYear : '',
      title: this.experienceData.title != null ? this.experienceData.title : '',
      typeOfJob: this.experienceData.typeOfJob != null ? this.experienceData.typeOfJob : '',
      mediaUpload: this.experienceData.mediaUpload != null ? this.experienceData.mediaUpload : '',
      mediaUploadChecked: this.experienceData.mediaUploadChecked != null ? this.experienceData.mediaUploadChecked : '',
      mediaLinkChecked: this.experienceData.mediaLinkChecked != null ? this.experienceData.mediaLinkChecked : '',
      mediaLink: this.experienceData.mediaLink != null ? this.experienceData.mediaLink : ''
    };
    console.log('Experience passing data array', experienceDATA);
    this.experienceData = experienceDATA;
  }
  setValue(key: string, value: any) {
     this.local.set(key, value);
  }
  back() {
    this.save();
    if (this.experienceData.id) {
      for (let i = 0; i < this.data.experience.length; i++) {
        const expData = this.data.experience[i] as ProfileExperienceModel;
        if ( expData.id === this.experienceData.id) {
          this.data.experience[i] = this.experienceData;
        }
      }
    } else {
      if (this.data.experience.length < 0) {
        this.experienceData.id = '1';
      } else {
        const expectNumber = this.experienceDatas.length + 1;
        this.experienceData.id = expectNumber.toString();
      }
      this.data.experience.push(this.experienceData);
    }

    console.log(this.data.experience);
    console.log(this.data);
    this.setValue(constants.profileStorageModel, JSON.stringify(this.data));

    if (this.redirect_id) {
      this.router.navigate(['/profile/add-experiences' , this.redirect_id], { relativeTo: this.route });
      localStorage.removeItem('redirect_id');
    } else {
      this.router.navigate(['/profile/add-experiences'], { relativeTo: this.route });
    }
  }
}
