import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ResumeModel } from '../../model/ResumeModel';
import { ProfileStorageModel } from '../../model/ProfileStorageModel';
import { LocalStorageService } from 'angular-web-storage';
import * as constants from '../../utils/Constants';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-resume-second',
  templateUrl: './add-resume-second.component.html',
  styleUrls: ['./add-resume-second.component.css'],
})
export class AddResumeSecondComponent implements OnInit {
  data: ResumeModel = new ResumeModel();
  profileData: ProfileStorageModel = new ProfileStorageModel();
  value;
  value1;
  id;
  userID = localStorage.getItem('userId');
  itemsCompetencies = [];
  selectedCompetencies = [];

  itemTechSkill = [];
  selectedTechSkill = [];

  itemIndustry = [];
  selectedIndustry = [];

  itemLanguage = [];
  selectedLanguage = [];

  itemQualification = [];
  selectedQualification = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public local: LocalStorageService,
    private authService: AuthService,
    private toastService: ToastrService
  ) {
    this.selectCompetencies();
    this.selectTechnicalSkill();
    this.selectIndustry();
    this.selectLanguage();
    this.selectQualification();
    const urlid = this.route.snapshot.params;
    this.id = urlid.id;
    console.log('url id', urlid.id);
  }

  ngOnInit() {
    this.getData();
  }
  selectCompetencies() {
    this.itemsCompetencies.push({
      title: 'New Business Development',
      showDetails: false,
    });
    this.itemsCompetencies.push({
      title: 'Grow the Existing Business',
      showDetails: false,
    });
    this.itemsCompetencies.push({
      title: 'Translating Information into Value',
      showDetails: false,
    });
    this.itemsCompetencies.push({
      title: 'Taking Risks and Leading Innovation',
      showDetails: false,
    });
    this.itemsCompetencies.push({
      title: 'Client-Customer Servicing',
      showDetails: false,
    });
    this.itemsCompetencies.push({
      title: 'Communication and Teamwork',
      showDetails: false,
    });
    this.itemsCompetencies.push({
      title: 'Drives Results',
      showDetails: false,
    });
    this.itemsCompetencies.push({
      title: 'Managing and Leading',
      showDetails: false,
    });
  }

  clickTypeOfCompetencies(item) {
    if (item.showDetails) {
      this.selectedCompetencies.push(item.title);
    } else {
      this.selectedCompetencies = [];
      for (let k = 0; k < this.itemsCompetencies.length; k++) {
        if (this.itemsCompetencies[k].showDetails) {
          if (item.title === this.itemsCompetencies[k].title) {
            this.itemsCompetencies[k].showDetails = false;
            this.selectedCompetencies.push(this.itemsCompetencies[k].title);
          } else {
            this.selectedCompetencies.push(this.itemsCompetencies[k].title);
          }
        }
      }
    }
  }
  saveCompetencies() {
    this.data.tempCompe = [];
    for (let j = 0; j < this.selectedCompetencies.length; j++) {
      this.data.tempCompe.push(this.selectedCompetencies[j]);
    }
    if (this.selectedCompetencies.length == 0) {
      this.toastService.warning('Select competencies Minimum 1 and Maximum 3 Values are allowed...');
    } else if (this.selectedCompetencies.length > 3) {
      // let competenciesDATA = this.data.competencies;
      // competenciesDATA = competenciesDATA.toString().replace(']', '');
      // const competenciesArray = competenciesDATA.split(',');
        this.toastService.warning('Select competencies Minimum 1 and Maximum 3 Values are allowed...');
    } else {
      this.data.competencies = this.data.tempCompe;
    }
  }
  discardChangesCompe() {
    if (this.data.competencies) {
      this.itemsCompetencies = [];
      this.selectCompetencies();
      for (let j = 0; j < this.data.competencies.length; j++) {
        for (let i = 0; i < this.itemsCompetencies.length; i++) {
          if (this.data.competencies[j] == this.itemsCompetencies[i].title) {
            this.itemsCompetencies[i].showDetails = true;
            break;
          }
        }
      }
    }
  }

  selectTechnicalSkill() {
    this.value = this.local.get(constants.profileStorageModel);
    if (this.value) {
      let techSkill;
      this.profileData = new ProfileStorageModel(
        JSON.parse(this.value.toString())
      );
      techSkill = this.profileData.technical_skills;
      if (techSkill.length > 0) {
        for (let i = 0; i < techSkill.length; i++) {
          this.itemTechSkill.push({
            skill: techSkill[i].title,
            industry: techSkill[i].title,
            languages: techSkill[i].title,
            title: techSkill[i].title,
            level: techSkill[i].level,
            showDetails: false,
          });
        }
      } else {
        this.itemTechSkill.push({
          title: 'Data Not Available',
          level: '',
          showDetails: false,
        });
      }
    }
  }
  clickTechnicalSkill(item) {
    if (item.showDetails) {
      this.selectedTechSkill.push({
        title: item.title,
        skill: item.title,
        languages: item.title,
        industry: item.title,
        level: item.level,
        showDetails: item.showDetails,
      });
    } else {
      this.selectedTechSkill = [];
      for (let k = 0; k < this.itemTechSkill.length; k++) {
        if (this.itemTechSkill[k].showDetails) {
          if (item.title === this.itemTechSkill[k].title) {
            this.itemTechSkill[k].showDetails = false;
            this.selectedTechSkill.push(this.itemTechSkill[k]);
          } else {
            this.selectedTechSkill.push(this.itemTechSkill[k]);
          }
        }
      }
    }
  }
  saveTechSkills() {
    this.data.technical_skills = [];
    const techArray = [];
    for (let j = 0; j < this.selectedTechSkill.length; j++) {
      this.data.technical_skills.push(this.selectedTechSkill[j]);
      techArray.push(this.data.technical_skills[j].title);
    }
    this.data.technical_skills_data = techArray.toString();
  }
  discardChangestechSkill() {
    if (this.selectedTechSkill) {
      this.itemTechSkill = [];
      this.selectTechnicalSkill();
      for (let j = 0; j < this.selectedTechSkill.length; j++) {
        for (let i = 0; i < this.itemTechSkill.length; i++) {
          if (this.selectedTechSkill[j].title === this.itemTechSkill[i].title) {
            this.itemTechSkill[i].showDetails = true;
            break;
          }
        }
      }
    }
  }

  selectIndustry() {
    this.value = this.local.get(constants.profileStorageModel);
    if (this.value) {
      let industry;
      this.profileData = new ProfileStorageModel(
        JSON.parse(this.value.toString())
      );
      industry = this.profileData.industry_skills;
      if (industry.length > 0) {
        for (let i = 0; i < industry.length; i++) {
          this.itemIndustry.push({
            skill: industry[i].title,
            industry: industry[i].title,
            languages: industry[i].title,
            title: industry[i].title,
            level: industry[i].level,
            showDetails: false,
          });
        }
      } else {
        this.itemIndustry.push({
          title: 'Data Not Available',
          level: '',
          showDetails: false,
        });
      }
    }
  }
  clickIndustry(item) {
    if (item.showDetails) {
      this.selectedIndustry.push({
        skill: item.title,
        languages: item.title,
        industry: item.title,
        title: item.title,
        level: item.level,
        showDetails: item.showDetails,
      });
    } else {
      this.selectedIndustry = [];
      for (let k = 0; k < this.itemIndustry.length; k++) {
        if (this.itemIndustry[k].showDetails) {
          if (item.title === this.itemIndustry[k].title) {
            this.itemIndustry[k].showDetails = false;
            this.selectedIndustry.push(this.itemIndustry[k]);
          } else {
            this.selectedIndustry.push(this.itemIndustry[k]);
          }
        }
      }
    }
  }
  saveIndustry() {
    this.data.industry_skills = [];
    const induArray = [];
    for (let j = 0; j < this.selectedIndustry.length; j++) {
      this.data.industry_skills.push(this.selectedIndustry[j]);
      induArray.push(this.selectedIndustry[j].title);
    }
    this.data.industry_skills_data = induArray.toString();
  }
  discardChangesIndustry() {
    if (this.selectedIndustry) {
      this.itemIndustry = [];
      this.selectIndustry();
      for (let j = 0; j < this.selectedIndustry.length; j++) {
        for (let i = 0; i < this.itemIndustry.length; i++) {
          if (this.selectedIndustry[j].title === this.itemIndustry[i].title) {
            this.itemIndustry[i].showDetails = true;
            break;
          }
        }
      }
    }
  }

  selectLanguage() {
    this.value = this.local.get(constants.profileStorageModel);
    if (this.value) {
      let language;
      this.profileData = new ProfileStorageModel(
        JSON.parse(this.value.toString())
      );
      language = this.profileData.language_skills;
      if (language.length > 0) {
        for (let i = 0; i < language.length; i++) {
          this.itemLanguage.push({
            skill: language[i].title,
            industry: language[i].title,
            languages: language[i].title,
            title: language[i].title,
            level: language[i].level,
            showDetails: false,
          });
        }
      } else {
        this.itemLanguage.push({
          title: 'Data Not Available',
          level: '',
          showDetails: false,
        });
      }
    }
  }
  clickLanguage(item) {
    if (item.showDetails) {
      this.selectedLanguage.push({
        skill: item.title,
        languages: item.title,
        industry: item.title,
        title: item.title,
        level: item.level,
        showDetails: item.showDetails,
      });
    } else {
      this.selectedLanguage = [];
      for (let k = 0; k < this.itemLanguage.length; k++) {
        if (this.itemLanguage[k].showDetails) {
          if (item.title === this.itemLanguage[k].title) {
            this.itemLanguage[k].showDetails = false;
            this.selectedLanguage.push(this.itemLanguage[k]);
          } else {
            this.selectedLanguage.push(this.itemLanguage[k]);
          }
        }
      }
    }
  }
  saveLanguage() {
    this.data.language_skills = [];
    const langArray = [];
    for (let j = 0; j < this.selectedLanguage.length; j++) {
      this.data.language_skills.push(this.selectedLanguage[j]);
      langArray.push(this.selectedLanguage[j].title);
    }
    this.data.language_skills_data = langArray.toString();
  }
  discardChangesLanguage() {
    if (this.selectedLanguage) {
      this.itemLanguage = [];
      this.selectLanguage();
      for (let j = 0; j < this.selectedLanguage.length; j++) {
        for (let i = 0; i < this.itemLanguage.length; i++) {
          if (this.selectedLanguage[j].title === this.itemLanguage[i].title) {
            this.itemLanguage[i].showDetails = true;
            break;
          }
        }
      }
    }
  }

  selectQualification() {
    this.value = this.local.get(constants.profileStorageModel);
    if (this.value) {
      let qualification;
      this.profileData = new ProfileStorageModel(
        JSON.parse(this.value.toString())
      );
      qualification = this.profileData.qualification;
      if (qualification.length > 0) {
        for (let i = 0; i < qualification.length; i++) {
          this.itemQualification.push({
            title: qualification[i],
            showDetails: false,
          });
        }
      } else {
        this.itemQualification.push({
          title: 'Data Not Available',
          level: '',
          showDetails: false,
        });
      }
    }
  }
  clickQualification(item) {
    if (item.showDetails) {
      this.selectedQualification.push(item.title);
    } else {
      this.selectedQualification = [];
      for (let k = 0; k < this.itemQualification.length; k++) {
        if (this.itemQualification[k].showDetails) {
          if (item.title === this.itemQualification[k].title) {
            this.itemQualification[k].showDetails = false;
            this.selectedQualification.push(this.itemQualification[k].title);
          } else {
            this.selectedQualification.push(this.itemQualification[k].title);
          }
        }
      }
    }
  }
  saveQualification() {
    this.data.qualifications = [];
    for (let j = 0; j < this.selectedQualification.length; j++) {
      this.data.qualifications.push(this.selectedQualification[j]);
    }
    this.data.qualifications_data = this.selectedQualification.toString();
  }
  discardChangesQual() {
    if (this.selectedQualification) {
      this.itemQualification = [];
      this.selectQualification();
      for (let j = 0; j < this.selectedQualification.length; j++) {
        for (let i = 0; i < this.itemQualification.length; i++) {
          if (
            this.selectedQualification[j] === this.itemQualification[i].title
          ) {
            this.itemQualification[i].showDetails = true;
            break;
          }
        }
      }
    }
  }
  setSkills() {
    if (this.data.competencies != null) {
      this.selectedCompetencies = [];
      // let competenciesDATA = this.data.competencies;
      // competenciesDATA = competenciesDATA.toString().replace(']', '');
      // const competenciesArray = competenciesDATA.split(',');
      const select0 = [];
      for (let i = 0; i < this.data.competencies.length; i++) {
        this.selectedCompetencies.push(this.data.competencies[i]);
        select0.push(this.data.competencies[i]);
      }
      this.data.competencies =  this.selectedCompetencies;
    }
    if (this.data.technical_skills != null) {
      const selected1 = [];
      this.selectedTechSkill = [];
      for (let i = 0; i < this.data.technical_skills.length; i++) {
        this.selectedTechSkill.push(this.data.technical_skills[i]);
        selected1.push(this.data.technical_skills[i].title);
      }
      this.data.technical_skills_data = selected1.toString();
    }
    if (this.data.industry_skills != null) {
      const selected2 = [];
      this.selectedIndustry = [];
      for (let i = 0; i < this.data.industry_skills.length; i++) {
        this.selectedIndustry.push(this.data.industry_skills[i]);
        selected2.push(this.data.industry_skills[i].title);
      }
      this.data.industry_skills_data = selected2.toString();
    }
    if (this.data.language_skills != null) {
      const selected3 = [];
      this.selectedLanguage = [];
      for (let i = 0; i < this.data.language_skills.length; i++) {
        this.selectedLanguage.push(this.data.language_skills[i]);
        selected3.push(this.data.language_skills[i].title);
      }
      this.data.language_skills_data = selected3.toString();
    }
    if (this.data.qualifications != null) {
      const selected4 = [];
      this.selectedQualification = [];
      for (let i = 0; i < this.data.qualifications.length; i++) {
        this.selectedQualification.push(this.data.qualifications[i]);
        selected4.push(this.data.qualifications[i]);
      }
      this.data.qualifications_data = selected4.toString();
    }
  }

  setValue(key: string, value: any) {
    this.local.set(key, value);
  }

  getData() {
    this.value = this.local.get(constants.resumeModel);
      if (this.value) {
        this.data = new ResumeModel(JSON.parse((this.value).toString()));
      }
    console.log(this.value);
    if (this.id) {
      this.setSkills();
    }
  }
  newReport() {
    // if (this.data.competencies == null) {
    //   this.toastService.warning('Select competencies Minimum 1 and Maximum 3 Values are allowed...');
    // } else {
    //   // let competenciesDATA = this.data.competencies;
    //   // competenciesDATA = competenciesDATA.toString().replace(']', '');
    //   // const competenciesArray = competenciesDATA.split(',');
    //   if (this.data.competencies.length > 3) {
    //     this.toastService.warning('Select competencies Minimum 1 and Maximum 3 Values are allowed...');
    //   } else if (this.data.description === '' || this.data.description == null) {
    //     this.toastService.warning('Description is required');
    //   } else {
        this.save();
        // this.setValue(constants.resumeModel, JSON.stringify(this.data));
        // console.log('idddddddddddddddddddd' , this.data);
        // this.router.navigate(['/resume/resume-gen' , this.data.id], { relativeTo: this.route });
    //   }
    // }
  }
  // newData() {
  //   if (this.data.technical_skills) {
  //     for ( let i = 0; i < this.data.technical_skills.length; i++) {
  //       let skill = this.data.technical_skills[i].title;
  //     }
  //   }
  //   if (this.data.industry_skills) {
      
  //   }
  //   if (this.data.language_skills) {
      
  //   }
  // }
  save() {
    let data1: any;
    const folder = 'Default Folder';
    // this.newData();
    data1 = {
      folder: folder,
      job_title: this.data.job_title != null ? this.data.job_title : '',
      reporting_to: '',
      team: this.data.team != null ? this.data.team : '',
      location: '',
      job_purpose: this.data.job_purpose != null ? this.data.job_purpose : '',
      organisation: this.data.organisation != null ? this.data.organisation : '',
      work_industry: this.data.work_industry != null ? this.data.work_industry : '',
      work_organisation: this.data.work_organisation != null ? this.data.work_organisation : '',
      experience: this.data.experience != null ? this.data.experience : '',
      job_type: '',
      competencies: this.data.competencies != null ? this.data.competencies : '',
      technical_skills: this.data.technical_skills != null ? this.data.technical_skills : [],
      industry_skills: this.data.industry_skills != null ? this.data.industry_skills : [],
      qualifications : this.data.qualifications != null ? this.data.qualifications : [],
      language_skills: this.data.language_skills != null ? this.data.language_skills : [],
      description: this.data.description != null ? this.data.description : '',
    };
    console.log('DATA SET: ', data1);

    this.authService.setLoader(true);
    if (this.id) {
      console.log('Update API-----------');
      this.authService
        .postDataString(constants.updateResume + '/' + this.id + '/' + this.userID, data1)
        .subscribe(
          (result) => {
            this.authService.setLoader(false);
            this.data = result.data;
            this.setValue(constants.resumeModel, JSON.stringify(this.data));
            console.log('DATA:UpdateResume: ', result);
            // this.getData();
            // this.storage.remove(Constants.resumeKey);
            console.log('idddddddddddddddddddd' , this.data);
            this.router.navigate(['/resume/resume-gen' , this.data.id], { relativeTo: this.route });
          },
          (error) => {
            this.authService.setLoader(false);
            console.log('error:UpdateResume', error);
          }
        );
    } else {
      console.log('Create API-----------');
      this.authService
        .postDataReport(constants.createResume + '/' + this.userID, data1)
        .subscribe(
          (result) => {
            console.log('DATA:CreateResume: ', result);
            this.data = result.data;
            this.setValue(constants.resumeModel, JSON.stringify(this.data));
            this.authService.setLoader(false);
            // this.getData();
            console.log('idddddddddddddddddddd' , this.data);
            this.router.navigate(['/resume/resume-gen' , this.data.id], { relativeTo: this.route });
          },
          (error) => {
            this.authService.setLoader(false);
            console.log('error:CreateResume', error);
          }
        );
    }
  }
  previous() {
    // this.setSkills(this.data);
    if (this.id) {
        this.setValue(constants.resumeModel, JSON.stringify(this.data));
      this.router.navigate(['/resume/resume-first/', this.id], { relativeTo: this.route });
    } else {
      this.setValue(constants.resumeModel, JSON.stringify(this.data));
      this.router.navigate(['/resume/resume-first'], { relativeTo: this.route });
    }
  }
}
