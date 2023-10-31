import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfileStorageModel } from '../../model/ProfileStorageModel';
import * as constants from '../../utils/Constants';
import { LocalStorageService } from 'angular-web-storage';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-skills',
  templateUrl: './add-skills.component.html',
  styleUrls: ['./add-skills.component.css'],
})
export class AddSkillsComponent implements OnInit {
  data: ProfileStorageModel = new ProfileStorageModel();
  id;
  value;
  userID;
  techSkills = [];
  industry = []; 
  language = [];
  qualification = [];
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public local: LocalStorageService,
    private authservice: AuthService
  ) {
    // window.scroll(0,0);
    const urlid = this.route.snapshot.params;
    this.id = urlid.id;
  }
  ngOnInit() {
  //  this.gotoTop();
    if (this.id) {
      this.getApi();
    } else {
      this.getData();
    }
  }

  ngAfterViewInit() {
    // Hack: Scrolls to top of Page after page view initialized
    let top = document.getElementById('top');
    if (top !== null) {
      top.scrollIntoView();
      top = null;
    }
  }

  gotoTop() {
    window.scroll({ 
      top: 0, 
      left: 0, 
      behavior: 'smooth' 
    });
  }
  getApi() {
    this.authservice.setLoader(true);
    this.authservice
      .getData(constants.getAndSetProfile + '/' + this.id)
      .subscribe(
        (result) => {
          console.log('API:getProfile:DATA:', result.data);
          this.setValue(
            constants.profileStorageModel,
            JSON.stringify(result.data)
          );
          this.getData();
          this.authservice.setLoader(false);
        },
        (error) => {
          console.log('error', error);
        }
      );
  }
  addMoreSkills() {
    this.techSkills.push({
      id: this.techSkills.length + 1,
      title: '',
      levelBeginner: false,
      levelProfi: false,
      levelExpert: false,
    });
  }
  DeleteSkill() {
    this.techSkills.pop();
  }
  DeleteIndustry() {
    this.industry.pop();
  }
  addMoreIndustry() {
    this.industry.push({
      id: this.industry.length + 1,
      title: '',
      levelBeginner: false,
      levelProfi: false,
      levelExpert: false,
    });
  }
  addMoreLanguage() {
    this.language.push({
      id: this.language.length + 1,
      title: '',
      levelBeginner: false,
      levelProfi: false,
      levelExpert: false,
    });
  }
  DeleteLanguage() {
    this.language.pop();
  }
  addMoreQualification() {
    this.qualification.push({ id: this.qualification.length + 1, title: '' });
  }
  DeleteQualification() {
    this.qualification.pop();
  }
  getData() {
    this.value = this.local.get(constants.profileStorageModel);
    if (this.value) {
      this.data = new ProfileStorageModel(JSON.parse(this.value.toString()));
      if (this.data.technical_skills.length > 0) {
        this.techSkills = this.data.technical_skills;
      } else {
        this.techSkills = [
          {
            id: 1,
            title: '',
            levelBeginner: false,
            levelProfi: false,
            levelExpert: false,
          },
        ];
      }
      if (this.data.industry_skills.length > 0) {
        this.industry = this.data.industry_skills;
      } else {
        this.industry = [
          {
            id: 1,
            title: '',
            levelBeginner: false,
            levelProfi: false,
            levelExpert: false,
          },
        ];
      }
      if (this.data.language_skills.length > 0) {
        this.language = this.data.language_skills;
      } else {
        this.language = [
          {
            id: 1,
            title: '',
            levelBeginner: false,
            levelProfi: false,
            levelExpert: false,
          },
        ];
      }
      if (this.data.qualification.length > 0) {
        this.qualification = this.data.qualification;
      } else {
        this.qualification = [{ id: 1, title: '' }];
      }
      const result = new ProfileStorageModel(JSON.parse(this.value.toString()));
      this.setSkillsData(result);
    }
  }
  radioChangeEventSkills(item, key) {
    for (let i = 0; i < this.techSkills.length; i++) {
      if (item && item.id === this.techSkills[i].id) {
        if (this.techSkills[i].title !== '') {
          if (key === 1) {
            this.techSkills[i].levelBeginner = true;
            this.techSkills[i].levelProfi = false;
            this.techSkills[i].levelExpert = false;
          } else if (key === 2) {
            this.techSkills[i].levelBeginner = false;
            this.techSkills[i].levelProfi = true;
            this.techSkills[i].levelExpert = false;
          } else if (key === 3) {
            this.techSkills[i].levelBeginner = false;
            this.techSkills[i].levelProfi = false;
            this.techSkills[i].levelExpert = true;
          }
        }
      }
    }
    // console.log('skills', this.techSkills);
  }
  radioChangeEventindustry(item, key) {
    for (let i = 0; i < this.industry.length; i++) {
      if (item && item.id === this.industry[i].id) {
        if (this.industry[i].title !== '') {
          if (key === 1) {
            this.industry[i].levelBeginner = true;
            this.industry[i].levelProfi = false;
            this.industry[i].levelExpert = false;
          } else if (key === 2) {
            this.industry[i].levelBeginner = false;
            this.industry[i].levelProfi = true;
            this.industry[i].levelExpert = false;
          } else if (key === 3) {
            this.industry[i].levelBeginner = false;
            this.industry[i].levelProfi = false;
            this.industry[i].levelExpert = true;
          }
        }
      }
    }
    // console.log('industry', this.techSkills);
  }
  radioChangeEventLanguage(item, key) {
    for (let i = 0; i < this.language.length; i++) {
      if (item && item.id === this.language[i].id) {
        if (this.language[i].title !== '') {
          if (key === 1) {
            this.language[i].levelBeginner = true;
            this.language[i].levelProfi = false;
            this.language[i].levelExpert = false;
          } else if (key === 2) {
            this.language[i].levelBeginner = false;
            this.language[i].levelProfi = true;
            this.language[i].levelExpert = false;
          } else if (key === 3) {
            this.language[i].levelBeginner = false;
            this.language[i].levelProfi = false;
            this.language[i].levelExpert = true;
          }
        }
      }
    }
    // console.log('Language', this.techSkills);
  }
  setValue(key, value) {
    this.local.set(key, value);
  }
  setSkillsData(result) {
    this.data.technical_skills = [];
    for (let i = 0; i < result.technical_skills.length; i++) {
      if (result.technical_skills[i].level === 'Beginer') {
        this.data.technical_skills.push({
          id: i,
          title: result.technical_skills[i].title,
          levelBeginner: true,
          levelProfi: false,
          levelExpert: false,
        });
      } else if (result.technical_skills[i].level === 'Proficient') {
        this.data.technical_skills.push({
          id: i,
          title: result.technical_skills[i].title,
          levelBeginner: false,
          levelProfi: true,
          levelExpert: false,
        });
      } else if (result.technical_skills[i].level === 'Expert') {
        this.data.technical_skills.push({
          id: i,
          title: result.technical_skills[i].title,
          levelBeginner: false,
          levelProfi: false,
          levelExpert: true,
        });
      }
    }

    this.data.industry_skills = [];
    for (let i = 0; i < result.industry_skills.length; i++) {
      if (result.industry_skills[i].level === 'Beginer') {
        this.data.industry_skills.push({
          id: i,
          title: result.industry_skills[i].title,
          levelBeginner: true,
          levelProfi: false,
          levelExpert: false,
        });
      } else if (result.industry_skills[i].level === 'Proficient') {
        this.data.industry_skills.push({
          id: i,
          title: result.industry_skills[i].title,
          levelBeginner: false,
          levelProfi: true,
          levelExpert: false,
        });
      } else if (result.industry_skills[i].level === 'Expert') {
        this.data.industry_skills.push({
          id: i,
          title: result.industry_skills[i].title,
          levelBeginner: false,
          levelProfi: false,
          levelExpert: true,
        });
      }
    }

    this.data.language_skills = [];
    for (let i = 0; i < result.language_skills.length; i++) {
      if (result.language_skills[i].level === 'Beginer') {
        this.data.language_skills.push({
          id: i,
          title: result.language_skills[i].title,
          levelBeginner: true,
          levelProfi: false,
          levelExpert: false,
        });
      } else if (result.language_skills[i].level === 'Proficient') {
        this.data.language_skills.push({
          id: i,
          title: result.language_skills[i].title,
          levelBeginner: false,
          levelProfi: true,
          levelExpert: false,
        });
      } else if (result.language_skills[i].level === 'Expert') {
        this.data.language_skills.push({
          id: i,
          title: result.language_skills[i].title,
          levelBeginner: false,
          levelProfi: false,
          levelExpert: true,
        });
      }
    }

    this.data.qualification = [];
    for (let i = 0; i < result.qualification.length; i++) {
      this.data.qualification.push({
        id: i,
        title: result.qualification[i],
      });
    }

    this.setTechSkillsData();
    this.setIndustrySkillsData();
    this.setLanguagesData();
    this.setQualificationData();
  }

  setTechSkillsData() {
    console.log('setTechSkillsData:' + this.data.technical_skills.length);
    if (this.data.technical_skills.length > 0) {
      this.techSkills = this.data.technical_skills;
    } else {
      this.techSkills = [
        {
          id: 1,
          title: '',
          levelBeginner: false,
          levelProfi: false,
          levelExpert: false,
        },
      ];
    }
  }

  setIndustrySkillsData() {
    if (this.data.industry_skills.length > 0) {
      this.industry = this.data.industry_skills;
    } else {
      this.industry = [
        {
          id: 1,
          title: '',
          levelBeginner: false,
          levelProfi: false,
          levelExpert: false,
        },
      ];
    }
  }

  setLanguagesData() {
    if (this.data.language_skills.length > 0) {
      this.language = this.data.language_skills;
    } else {
      this.language = [
        {
          id: 1,
          title: '',
          levelBeginner: false,
          levelProfi: false,
          levelExpert: false,
        },
      ];
    }
  }

  setQualificationData() {
    if (this.data.qualification.length > 0) {
      this.qualification = this.data.qualification;
    } else {
      this.qualification = [{ id: 1, title: '' }];
    }
  }
  redirect() {
    this.dataPassing();
    if (this.id) {
      this.router.navigate(['/profile/profile-progress', this.id], {
        relativeTo: this.route,
      });
    }
  }
  next() {
    this.dataPassing();
    if (this.id) {
      this.router.navigate(['/profile/add-preferences', this.id], {
        relativeTo: this.route,
      });
    } else {
      this.setValue(constants.profileStorageModel, JSON.stringify(this.data));
      this.router.navigate(['/profile/add-preferences'], {
        relativeTo: this.route,
      });
    }
  }
  dataPassing() {
    const tech: any[] = [];
    const indu: any[] = [];
    const lang: any[] = [];
    const qual: any[] = [];
    for (let i = 0; i < this.techSkills.length; i++) {
      if (this.techSkills[i].title !== '') {
        tech.push({
          id: this.techSkills[i].id,
          title: this.techSkills[i].title,
          levelBeginner: this.techSkills[i].levelBeginner,
          levelProfi: this.techSkills[i].levelProfi,
          levelExpert: this.techSkills[i].levelExpert,
        });
      }
    }
    for (let i = 0; i < this.industry.length; i++) {
      if (this.industry[i].title !== '') {
        indu.push({
          id: this.industry[i].id,
          title: this.industry[i].title,
          levelBeginner: this.industry[i].levelBeginner,
          levelProfi: this.industry[i].levelProfi,
          levelExpert: this.industry[i].levelExpert,
        });
      }
    }
    for (let i = 0; i < this.language.length; i++) {
      if (this.language[i].title !== '') {
        lang.push({
          id: this.language[i].id,
          title: this.language[i].title,
          levelBeginner: this.language[i].levelBeginner,
          levelProfi: this.language[i].levelProfi,
          levelExpert: this.language[i].levelExpert,
        });
      }
    }
    for (let i = 0; i < this.qualification.length; i++) {
      if (this.qualification[i].title !== '') {
        qual.push(this.qualification[i].title);
      }
    }
    this.data.technical_skills = tech;
    this.data.industry_skills = indu;
    this.data.language_skills = lang;
    this.data.qualification = qual;
    console.log('data Will passed', this.data);
    this.saveApiCall();
  }
  saveApiCall() {
    let skills: any[];

    for (let i = 0; i < this.data.technical_skills.length; i++) {
      let value: String;
      if (this.data.technical_skills[i].levelBeginner === true) {
        value = 'Beginer';
      }
      if (this.data.technical_skills[i].levelProfi === true) {
        value = 'Proficient';
      }
      if (this.data.technical_skills[i].levelExpert === true) {
        value = 'Expert';
      }
      if (i === 0) {
        skills = [{ skill: this.data.technical_skills[i].title, value: value }];
      } else {
        skills.push({
          skill: this.data.technical_skills[i].title,
          value: value,
        });
      }
    }
    let industry: any[];

    for (let i = 0; i < this.data.industry_skills.length; i++) {
      let value: String;
      if (this.data.industry_skills[i].levelBeginner === true) {
        value = 'Beginer';
      }
      if (this.data.industry_skills[i].levelProfi === true) {
        value = 'Proficient';
      }
      if (this.data.industry_skills[i].levelExpert === true) {
        value = 'Expert';
      }
      if (i === 0) {
        industry = [
          { industry: this.data.industry_skills[i].title, value: value },
        ];
      } else {
        industry.push({
          industry: this.data.industry_skills[i].title,
          value: value,
        });
      }
    }

    let language: any[];

    for (let i = 0; i < this.data.language_skills.length; i++) {
      let value: String;
      if (this.data.language_skills[i].levelBeginner === true) {
        value = 'Beginer';
      }
      if (this.data.language_skills[i].levelProfi === true) {
        value = 'Proficient';
      }
      if (this.data.language_skills[i].levelExpert === true) {
        value = 'Expert';
      }
      if (i === 0) {
        language = [
          { languages: this.data.language_skills[i].title, value: value },
        ];
      } else {
        language.push({
          languages: this.data.language_skills[i].title,
          value: value,
        });
      }
    }
    let data1: any;
    data1 = {
      first_name: this.data.first_name,
      last_name: this.data.last_name,
      alternateEmail: this.data.alternateEmail,
      describe_yourself: this.data.describe_yourself != null ? this.data.describe_yourself : '',
      des_val_strengths: this.data.des_val_strengths != null ? this.data.des_val_strengths : '',
      technical_skills: skills != null ? skills : [],
      industry_skills: industry != null ? industry : [],
      qualification: this.data.qualification != null ? this.data.qualification : [],
      language_skills: language != null ? language : [],
    };
    console.log('dataconsole', data1);

    this.authservice
      .postDataString(constants.getAndSetProfile + '/' + this.id, data1)
      .subscribe(
        (result) => {
          console.log('resultMyProfile: ', result);
          this.setValue(constants.profileStorageModel, JSON.stringify(result.data));
        },
        (error) => {
          console.log('errorNewJob', error);
        }
      );
  }

  back() {
    this.dataPassing();
    if (this.id) {
      // this.setValue(constants.profileStorageModel, JSON.stringify(this.data));
      this.router.navigate(['/profile/create-profile', this.id], {
        relativeTo: this.route,
      });
    } else {
      // this.setValue(constants.profileStorageModel, JSON.stringify(this.data));
      this.router.navigate(['/profile/create-profile'], {
        relativeTo: this.route,
      });
    }
  }
}
