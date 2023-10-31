import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileStorageModel } from '../../../model/ProfileStorageModel';
import { ProfileAchievementModel } from '../../../model/ProfileAchievementsModel';
import { LocalStorageService } from 'angular-web-storage';
import * as constants from '../../../utils/Constants';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-achievement-desc',
  templateUrl: './achievement-desc.component.html',
  styleUrls: ['./achievement-desc.component.css']
})
export class AchievementDescComponent implements OnInit {
  data: ProfileStorageModel = new ProfileStorageModel;
  achievementData: ProfileAchievementModel = new ProfileAchievementModel;
  itemsRoleLevel: Array<{title: string, showDetails: boolean}> = [];
  itemsCapabilitieLevel: Array<{title: string, showDetails: boolean}> = [];
  achievementDatas = [];
  value;
  temp = [];
  duplicate = [];
  flag;
  selectedCapability = [];
  redirect_id = localStorage.getItem('pass_id');
  constructor(private router: Router, private route: ActivatedRoute, public local: LocalStorageService, private toastService: ToastrService) {
    // this.RoleLevel();
    this.CapabilitiesLevel();
  }

  ngOnInit() {
    this.getData();
    const id = this.route.snapshot.params;
    this.updatedata(id);
  }
  // RoleLevel() {
  //   this.itemsRoleLevel.push({
  //     title: 'Application Developer',
  //     showDetails: false
  //   });
  //   this.itemsRoleLevel.push({
  //     title: 'Applications Engineer',
  //     showDetails: false
  //   });
  //   this.itemsRoleLevel.push({
  //     title: 'Associate Developer',
  //     showDetails: false
  //   });
  //   this.itemsRoleLevel.push({
  //     title: 'Computer Programmer',
  //     showDetails: false
  //   });
  //   this.itemsRoleLevel.push({
  //     title: 'Programmer Analyst',
  //     showDetails: false
  //   });
  //   this.itemsRoleLevel.push({
  //     title: 'Senior Applications Engineer',
  //     showDetails: false
  //   });
  //   this.itemsRoleLevel.push({
  //     title: 'Senior Programmer',
  //     showDetails: false
  //   });
  //   this.itemsRoleLevel.push({
  //     title: 'Software Developer',
  //     showDetails: false
  //   });
  // }
  CapabilitiesLevel() {
    this.itemsCapabilitieLevel.push({
      title: 'New Business Development',
      showDetails: false
    });
    this.itemsCapabilitieLevel.push({
      title: 'Grow the Existing Business',
      showDetails: false
    });
    this.itemsCapabilitieLevel.push({
      title: 'Translating Information into Value',
      showDetails: false
    });
    this.itemsCapabilitieLevel.push({
      title: 'Taking Risks and Leading Innovation',
      showDetails: false
    });
    this.itemsCapabilitieLevel.push({
      title: 'Client-Customer Servicing',
      showDetails: false
    });
    this.itemsCapabilitieLevel.push({
      title: 'Communication and Teamwork',
      showDetails: false
    });
    this.itemsCapabilitieLevel.push({
      title: 'Drives Results',
      showDetails: false
    });
    this.itemsCapabilitieLevel.push({
      title: 'Managing and Leading',
      showDetails: false
    });
  }
  clickTypeOfRole(item) {
    if (item.showDetails) {
      let dataTitle = '';
      for (let k = 0; k < this.itemsRoleLevel.length; k++) {
        if (this.achievementData.role === this.itemsRoleLevel[k].title) {
          this.itemsRoleLevel[k].showDetails = false;
          this.achievementData.role = '';
        }
        if (item.title === this.itemsRoleLevel[k].title) {
          this.itemsRoleLevel[k].showDetails = true;
          console.log(this.itemsRoleLevel[k].title);
          dataTitle = this.itemsRoleLevel[k].title;
      } else {
        this.itemsRoleLevel[k].showDetails = false;
      }
      this.achievementData.role = dataTitle;
      }
    } else {
      const dataTitle = '';
      for (let k = 0; k < this.itemsRoleLevel.length; k++) {
        this.itemsRoleLevel[k].showDetails = false;
      }
      this.achievementData.role = dataTitle;
    }
  }
  selectedRole() {
    if (this.achievementData.role) {
      for (let i = 0; i < this.itemsRoleLevel.length; i++) {
        if (this.achievementData.role === this.itemsRoleLevel[i].title) {
          this.itemsRoleLevel[i].showDetails = true;
        }
      }
    }
  }
  // clickTypeOfCapabilities(item) {
  //   if (item.showDetails) {
  //     let dataTitle = [];
  //     for (let k = 0; k < this.itemsCapabilitieLevel.length; k++) {
  //       if (this.achievementData.capabilities[0] === this.itemsCapabilitieLevel[k].title) {
  //         this.itemsCapabilitieLevel[k].showDetails = false;
  //         this.achievementData.capabilities = [];
  //       }
  //       if (item.title === this.itemsCapabilitieLevel[k].title) {
  //         this.itemsCapabilitieLevel[k].showDetails = true;
  //         console.log(this.itemsCapabilitieLevel[k].title);
  //         dataTitle.push(this.itemsCapabilitieLevel[k].title);
  //     } else {
  //       this.itemsCapabilitieLevel[k].showDetails = false;
  //     }
  //     this.achievementData.capabilities = dataTitle;
  //     }
  //   } else {
  //     const dataTitle = [];
  //     for (let k = 0; k < this.itemsCapabilitieLevel.length; k++) {
  //       this.itemsCapabilitieLevel[k].showDetails = false;
  //     }
  //     this.achievementData.capabilities = dataTitle;
  //   }
  // }
  // selectedCapabilities() {
  //   if (this.achievementData.capabilities) {
  //     for (let i = 0; i < this.itemsCapabilitieLevel.length; i++) {
  //       if (this.achievementData.capabilities[0] === this.itemsCapabilitieLevel[i].title) {
  //         this.itemsCapabilitieLevel[i].showDetails = true;
  //       }
  //     }
  //   }
  // }
  clickTypeOfCapabilities(item) {
    if (item.showDetails) {
      this.selectedCapability.push(item.title);
    } else {
      this.selectedCapability = [];
      for (let k = 0; k < this.itemsCapabilitieLevel.length; k++) {
        if (this.itemsCapabilitieLevel[k].showDetails) {
          if (item.title === this.itemsCapabilitieLevel[k].title) {
            this.itemsCapabilitieLevel[k].showDetails = false;
            this.selectedCapability.push(this.itemsCapabilitieLevel[k].title);
          } else {
            this.selectedCapability.push(this.itemsCapabilitieLevel[k].title);
          }
        }
      }
    }
  }
  selectedCapabilities() {
    let tempCompe = [];
    for (let j = 0; j < this.selectedCapability.length; j++) {
      tempCompe.push(this.selectedCapability[j]);
    }
    if (this.selectedCapability.length == 0) {
      this.toastService.warning('Select competencies Minimum 1 and Maximum 3 Values are allowed...');
    } else if (this.selectedCapability.length > 3) {
      // let competenciesDATA = this.data.competencies;
      // competenciesDATA = competenciesDATA.toString().replace(']', '');
      // const competenciesArray = competenciesDATA.split(',');
        this.toastService.warning('Select competencies Minimum 1 and Maximum 3 Values are allowed...');
    } else {
      this.achievementData.capabilities = tempCompe;
    }
  }
  discardChangesCompe() {
    // this.selectedCapability = this.achievementData.capabilities;
    if (this.achievementData.capabilities.length != 0) {
      this.itemsCapabilitieLevel = [];
      this.CapabilitiesLevel();
      for (let j = 0; j < this.achievementData.capabilities.length; j++) {
        for (let i = 0; i < this.itemsCapabilitieLevel.length; i++) {
          if (this.achievementData.capabilities[j] == this.itemsCapabilitieLevel[i].title) {
            this.itemsCapabilitieLevel[i].showDetails = true;
            break;
          }
        }
      }
    }
  }
  updatedata(id) {
    this.temp = this.data.achievements;
    for (let i = 0 ; i < this.temp.length; i++) {
      if ( this.temp[i].id == id.id) {
        this.achievementData = this.temp[i];
        console.log('----------------', this.temp[i]);
      }
    }
    this.selectedCapability = this.achievementData.capabilities;
  }
  getData() {
    this.value = this.local.get(constants.profileStorageModel);
      if (this.value) {
        this.data = new ProfileStorageModel(JSON.parse(this.value.toString()));
        if (this.data.achievements) {
          this.achievementDatas = this.data.achievements;
          console.log(this.achievementDatas);
        }
        this.itemsRoleLevel = [];
        for ( let i = 0; i < this.data.experience.length; i++ ) {
          this.flag = true;
          let temp = [];
          temp.push(this.data.experience[i]);
          if (this.itemsRoleLevel.length > 0 ) {
            for ( let j = 0; j < this.itemsRoleLevel.length; j++ ) {
              if ( temp[0].industry == this.itemsRoleLevel[j].title) {
                this.flag = false;
                break;
              }
            }
            if (this.flag == true ) {
              this.itemsRoleLevel.push({
                title:  temp[0].industry,
                showDetails: false
              });
            }
          } else {
            this.itemsRoleLevel.push({
              title:  temp[0].industry,
              showDetails: false
            });
          }
        }
      }
  }
  setValue(key: string, value: any) {
    this.local.set(key, value);
 }
  back() {
    if (this.achievementData.id) {
      for (let i = 0; i < this.data.achievements.length; i++) {
        const expData = this.data.achievements[i] as ProfileAchievementModel;
        if (expData.id === this.achievementData.id) {
          if (this.achievementData.title !== '') {
            this.data.achievements[i] = this.achievementData;
          } else {
            this.data.achievements.splice(i, 1);
            for (let j = 0; j < this.data.achievements.length; j++) {
              const profileAchivementData = this.data.achievements[j] as ProfileAchievementModel;
              const index = j + 1;
              profileAchivementData.id =  index.toString();
              this.data.achievements[j] = profileAchivementData.id;
            }
          }
        }
      }
    } else {
      if (this.data.achievements.length < 0) {
        this.achievementData.id = '1';
      } else {
        console.log(this.achievementDatas);
        const achievementNumber = this.achievementDatas.length + 1;
        console.log(achievementNumber);
        this.achievementData.id = achievementNumber.toString();
       }
      this.data.achievements.push(this.achievementData);
     }

    console.log(this.achievementData);
    console.log(this.data);
    this.setValue(constants.profileStorageModel, JSON.stringify(this.data));
    if (this.redirect_id) {
      this.router.navigate(['/profile/add-achievements' , this.redirect_id], { relativeTo: this.route });
      localStorage.removeItem('redirect_id');
    } else {
      this.router.navigate(['/profile/add-achievements'], { relativeTo: this.route });
    }
  }
}
