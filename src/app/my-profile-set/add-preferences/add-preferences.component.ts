import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProfileStorageModel } from '../../model/ProfileStorageModel';
import { LocalStorageService } from 'angular-web-storage';
import * as constants from '../../utils/Constants';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-preferences',
  templateUrl: './add-preferences.component.html',
  styleUrls: ['./add-preferences.component.css'],
})
export class AddPreferencesComponent implements OnInit {
  data: ProfileStorageModel = new ProfileStorageModel();
  id;
  value;
  FActive: any = 0;
  SActive: any = 0;
  TActive: any = 0;
  FActiveString: any = '';
  SActiveString: any = '';
  TActiveString: any = '';

  firstActive: any = 0;
  secondActive: any = 0;
  thirdActive: any = 0;
  fourthActive: any = 0;
  fifthActive: any = 0;
  firstActiveString: any = '';
  secondActiveString: any = '';
  thirdActiveString: any = '';
  fourthActiveString: any = '';
  fifthActiveString: any = '';

  directRangeAttitude: any = 0;
  resultsRangeAttitude: any = 0;
  inspiringRangeAttitude: any = 0;
  balancedRangeAttitude: any = 0;
  perspectiveRangeAttitude: any = 0;
  focusedRangeAttitude: any = 0;

  repetitveRangeAttitude: any = 0;
  symanticRangeAttitude: any = 0;
  bigpictureRangeAttitude: any = 0;
  firstresultRangeAttitude: any = 0;
  maintainRangeAttitude: any = 0;
  creativityRangeAttitude: any = 0;
  beingRangeAttitude: any = 0;
  helpingRangeAttitude: any = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public local: LocalStorageService,
    private authservice: AuthService
  ) {
    window.scroll(0,0);
    const urlid = this.route.snapshot.params;
    this.id = urlid.id;
  }

  ngOnInit() {
    // this.gotoTop();
    this.getData();
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

  toggleFE() {
    if (this.FActive === 1) {
      this.FActive = 0;
      this.FActiveString = '';
    } else {
      this.FActive = 1;
      this.FActiveString = 'Independent';
    }
  }

  toggleFN() {
    if (this.FActive === 2) {
      this.FActive = 0;
      this.FActiveString = '';
    } else {
      this.FActive = 2;
      this.FActiveString = 'With others';
    }
  }

  toggleSE() {
    if (this.SActive === 1) {
      this.SActive = 0;
      this.SActiveString = '';
    } else {
      this.SActive = 1;
      this.SActiveString = 'Fact based, strong analytics';
    }
  }

  toggleSN() {
    if (this.SActive === 2) {
      this.SActive = 0;
      this.SActiveString = '';
    } else {
      this.SActive = 2;
      this.SActiveString = ' Fast is most important';
    }
  }

  toggleTE() {
    if (this.TActive === 1) {
      this.TActive = 0;
      this.TActiveString = '';
    } else {
      this.TActive = 1;
      this.TActiveString = ' According to rules/ process';
    }
  }

  toggleTN() {
    if (this.TActive === 2) {
      this.TActive = 0;
      this.TActiveString = '';
    } else {
      this.TActive = 2;
      this.TActiveString = 'Weigh options, find optimal solutions';
    }
  }

  toggleFirstE() {
    if (this.firstActive === 1) {
      this.firstActive = 0;
      this.firstActiveString = '';
    } else {
      this.firstActive = 1;
      this.firstActiveString = 'Risk taking, comfortable with ambiguity';
    }
  }

  toggleFirstN() {
    if (this.firstActive === 2) {
      this.firstActive = 0;
      this.firstActiveString = '';
    } else {
      this.firstActive = 2;
      this.firstActiveString = 'Stability and security';
    }
  }

  toggleSecondE() {
    if (this.secondActive === 1) {
      this.secondActive = 0;
      this.secondActiveString = '';
    } else {
      this.secondActive = 1;
      this.secondActiveString = 'Specialist, subject matter expert';
    }
  }

  toggleSecondN() {
    if (this.secondActive === 2) {
      this.secondActive = 0;
      this.secondActiveString = '';
    } else {
      this.secondActive = 2;
      this.secondActiveString = 'Working as part of a team';
    }
  }

  toggleThirdE() {
    if (this.thirdActive === 1) {
      this.thirdActive = 0;
      this.thirdActiveString = '';
    } else {
      this.thirdActive = 1;
      this.thirdActiveString = 'Independent, self motivating';
    }
  }

  toggleThirdN() {
    if (this.thirdActive === 2) {
      this.thirdActive = 0;
      this.thirdActiveString = '';
    } else {
      this.thirdActive = 2;
      this.thirdActiveString = 'Positive, encouraging atmosphere';
    }
  }

  toggleFourthE() {
    if (this.fourthActive === 1) {
      this.fourthActive = 0;
      this.fourthActiveString = '';
    } else {
      this.fourthActive = 1;
      this.fourthActiveString = 'Promotion,and career growth';
    }
  }

  toggleFourthN() {
    if (this.fourthActive === 2) {
      this.fourthActive = 0;
      this.fourthActiveString = '';
    } else {
      this.fourthActive = 2;
      this.fourthActiveString = 'Recognition and achievements';
    }
  }

  toggleFifthE() {
    if (this.fifthActive === 1) {
      this.fifthActive = 0;
      this.fifthActiveString = '';
    } else {
      this.fifthActive = 1;
      this.fifthActiveString = 'Autonomous and self directed ';
    }
  }

  toggleFifthN() {
    if (this.fifthActive === 2) {
      this.fifthActive = 0;
      this.fifthActiveString = '';
    } else {
      this.fifthActive = 2;
      this.fifthActiveString = 'Clear, direction and support';
    }
  }
  rangeChangeEvent(item, key) {
    console.log('rangeChangeEvent' + item.value.toString() + 'Key' + key);
    if (key === 1) {
      // tslint:disable-next-line: radix
      this.data.directRangeAttitude = (Number.parseInt(item.value.toString()) / 2).toString();
      console.log('Val', this.data.directRangeAttitude);
    } else if (key === 2) {
      // tslint:disable-next-line: radix
      this.data.resultsRangeAttitude = (Number.parseInt(item.value.toString()) / 2).toString();
    } else if (key === 3) {
      // tslint:disable-next-line: radix
      this.data.inspiringRangeAttitude = (Number.parseInt(item.value.toString()) / 2).toString();
    } else if (key === 4) {
      // tslint:disable-next-line: radix
      this.data.balancedRangeAttitude = (Number.parseInt(item.value.toString()) / 2).toString();
    } else if (key === 5) {
      // tslint:disable-next-line: radix
      this.data.perspectiveRangeAttitude = (Number.parseInt(item.value.toString()) / 2).toString();
    } else if (key === 6) {
      // tslint:disable-next-line: radix
      this.data.focusedRangeAttitude = (Number.parseInt(item.value.toString()) / 2).toString();
    }
  }
  enjoyRangeChangeEvent(item, key) {
    console.log('enjoyrangeChangeEvent' + item.value.toString() + 'Key' + key);
    if (key === 1) {
      this.data.repetitveRangeAttitude = item.value.toString();
      console.log('Val', this.data.repetitveRangeAttitude);
    } else if (key === 2) {
      this.data.symanticRangeAttitude = item.value.toString();
    } else if (key === 3) {
      this.data.bigpictureRangeAttitude = item.value.toString();
    } else if (key === 4) {
      this.data.firstresultRangeAttitude = item.value.toString();
    } else if (key === 5) {
      this.data.maintainRangeAttitude = item.value.toString();
    } else if (key === 6) {
      this.data.creativityRangeAttitude = item.value.toString();
    } else if (key === 7) {
      this.data.beingRangeAttitude = item.value.toString();
    } else if (key === 8) {
      this.data.helpingRangeAttitude = item.value.toString();
    }
  }
  getData() {
    this.value = this.local.get(constants.profileStorageModel);
    if (this.value) {
      this.data = new ProfileStorageModel(JSON.parse(this.value.toString()));
      // for (let i = 0; i < this.data.motivations.length; i++) {
      //   if (this.data.motivations[i].index == 1) {
      //     this.firstActive = this.data.motivations[i].active;
      //     this.firstActiveString = this.data.motivations[i].name;
      //   } else if (this.data.motivations[i].index == 2) {
      //     this.secondActive = this.data.motivations[i].active;
      //     this.secondActiveString = this.data.motivations[i].name;
      //   } else if (this.data.motivations[i].index == 3) {
      //     this.thirdActive = this.data.motivations[i].active;
      //     this.thirdActiveString = this.data.motivations[i].name;
      //   } else if (this.data.motivations[i].index == 4) {
      //     this.fourthActive = this.data.motivations[i].active;
      //     this.fourthActiveString = this.data.motivations[i].name;
      //   } else if (this.data.motivations[i].index == 5) {
      //     this.fifthActive = this.data.motivations[i].active;
      //     this.fifthActiveString = this.data.motivations[i].name;
      //   }
      // }
      // for (let i = 0; i < this.data.decisionStyles.length; i++) {
      //   if (this.data.decisionStyles[i].index == 1) {
      //     this.FActive = this.data.decisionStyles[i].active;
      //     this.FActiveString = this.data.decisionStyles[i].name;
      //   } else if (this.data.decisionStyles[i].index == 2) {
      //     this.SActive = this.data.decisionStyles[i].active;
      //     this.SActiveString = this.data.decisionStyles[i].name;
      //   } else if (this.data.decisionStyles[i].index == 3) {
      //     this.TActive = this.data.decisionStyles[i].active;
      //     this.TActiveString = this.data.decisionStyles[i].name;
      //   }
      // }
      // console.log('getData', this.data);

      // this.directRangeAttitude = Number.parseFloat(this.data.directRangeAttitude.toString()) * 2;
      // this.resultsRangeAttitude = Number.parseFloat(this.data.resultsRangeAttitude.toString()) * 2;
      // this.inspiringRangeAttitude = Number.parseFloat(this.data.inspiringRangeAttitude.toString()) * 2;
      // this.balancedRangeAttitude = Number.parseFloat(this.data.balancedRangeAttitude.toString()) * 2;
      // this.perspectiveRangeAttitude = Number.parseFloat(this.data.perspectiveRangeAttitude.toString()) * 2;
      // this.focusedRangeAttitude = Number.parseFloat(this.data.focusedRangeAttitude.toString()) * 2;

      // this.repetitveRangeAttitude = Number.parseFloat(this.data.repetitveRangeAttitude.toString()) * 2;
      // this.symanticRangeAttitude = Number.parseFloat(this.data.symanticRangeAttitude.toString()) * 2;
      // this.bigpictureRangeAttitude  = Number.parseFloat(this.data.bigpictureRangeAttitude.toString()) * 2;
      // this.firstresultRangeAttitude = Number.parseFloat(this.data.firstresultRangeAttitude.toString()) * 2;
      // this.maintainRangeAttitude = Number.parseFloat(this.data.maintainRangeAttitude.toString()) * 2;
      // this.creativityRangeAttitude = Number.parseFloat(this.data.creativityRangeAttitude.toString()) * 2;
      // this.beingRangeAttitude = Number.parseFloat(this.data.beingRangeAttitude.toString()) * 2;
      // this.helpingRangeAttitude = Number.parseFloat(this.data.helpingRangeAttitude.toString()) * 2;

      const result = new ProfileStorageModel(JSON.parse(this.value.toString()));
      this.setPreferemcesData(result);
    }
  }

  setValue(key, value) {
    this.local.set(key, value);
  }

  setPreferemcesData(result) {
    this.data.decisionStyles = [];
    for (let i = 0; i < result.decision_style.length; i++) {
      if (result.decision_style[i].key === 'independent') {
        this.data.decisionStyles.push({
          name: result.decision_style[i].question,
          active: 1,
          index: 1,
          key: result.decision_style[i].key,
        });
      } else if (result.decision_style[i].key === 'with_others') {
        this.data.decisionStyles.push({
          name: result.decision_style[i].question,
          active: 2,
          index: 1,
          key: result.decision_style[i].key,
        });
      }

      if (result.decision_style[i].key === 'fact_based_analytics') {
        this.data.decisionStyles.push({
          name: result.decision_style[i].question,
          active: 1,
          index: 2,
          key: result.decision_style[i].key,
        });
      } else if (result.decision_style[i].key === 'fast') {
        this.data.decisionStyles.push({
          name: result.decision_style[i].question,
          active: 2,
          index: 2,
          key: result.decision_style[i].key,
        });
      }

      if (result.decision_style[i].key === 'according_rules') {
        this.data.decisionStyles.push({
          name: result.decision_style[i].question,
          active: 1,
          index: 3,
          key: result.decision_style[i].key,
        });
      } else if (result.decision_style[i].key === 'find_solution') {
        this.data.decisionStyles.push({
          name: result.decision_style[i].question,
          active: 2,
          index: 3,
          key: result.decision_style[i].key,
        });
      }
    }

    for (let i = 0; i < result.communication_style.length; i++) {
      if (
        result.communication_style[i].question === 'Direct, fast, fact based'
      ) {
        this.data.directRangeAttitude = result.communication_style[i].value;
      } else if (result.communication_style[i].question === 'Results focused') {
        this.data.resultsRangeAttitude = result.communication_style[i].value;
      } else if (
        result.communication_style[i].question === 'Inspiring and motivating'
      ) {
        this.data.inspiringRangeAttitude = result.communication_style[i].value;
      } else if (
        result.communication_style[i].question ===
        'Balanced listening and talking'
      ) {
        this.data.balancedRangeAttitude = result.communication_style[i].value;
      } else if (
        result.communication_style[i].question ===
        'Considerate of others perspectives'
      ) {
        this.data.perspectiveRangeAttitude =
          result.communication_style[i].value;
      } else if (
        result.communication_style[i].question ===
        'Focused keeping to the subject'
      ) {
        this.data.focusedRangeAttitude = result.communication_style[i].value;
      }
    }

    for (let i = 0; i < result.work.length; i++) {
      if (result.work[i].question === 'Repetitive routines and processes') {
        this.data.repetitveRangeAttitude = result.work[i].value;
        console.log(result.work[i].value);
      } else if (
        result.work[i].question === 'Systematic and detailed planning'
      ) {
        this.data.symanticRangeAttitude = result.work[i].value;
      } else if (
        result.work[i].question === 'Big picture, minimal instructions'
      ) {
        this.data.bigpictureRangeAttitude = result.work[i].value;
      } else if (
        result.work[i].question === 'Results come first before everything'
      ) {
        this.data.firstresultRangeAttitude = result.work[i].value;
      } else if (
        result.work[i].question === 'Maintaining multiple relationships'
      ) {
        this.data.maintainRangeAttitude = result.work[i].value;
      } else if (
        result.work[i].question === 'Creativity in finding new solutions'
      ) {
        this.data.creativityRangeAttitude = result.work[i].value;
      } else if (result.work[i].question === 'Being positive and optimistic') {
        this.data.beingRangeAttitude = result.work[i].value;
      } else if (result.work[i].question === 'Helping and guiding others') {
        this.data.helpingRangeAttitude = result.work[i].value;
      }
    }

    this.data.motivations = [];
    for (let i = 0; i < result.motivations.length; i++) {
      if (result.motivations[i].key === 'risk_taking') {
        this.data.motivations.push({
          name: result.motivations[i].question,
          active: 1,
          index: 1,
          key: result.motivations[i].key,
        });
      } else if (result.motivations[i].key === 'stability') {
        this.data.motivations.push({
          name: result.motivations[i].question,
          active: 2,
          index: 1,
          key: result.motivations[i].key,
        });
      }

      if (result.motivations[i].key === 'specialist_sme') {
        this.data.motivations.push({
          name: result.motivations[i].question,
          active: 1,
          index: 2,
          key: result.motivations[i].key,
        });
      } else if (result.motivations[i].key === 'working_team') {
        this.data.motivations.push({
          name: result.motivations[i].question,
          active: 2,
          index: 2,
          key: result.motivations[i].key,
        });
      }

      if (result.motivations[i].key === 'independent') {
        this.data.motivations.push({
          name: result.motivations[i].question,
          active: 1,
          index: 3,
          key: result.motivations[i].key,
        });
      } else if (result.motivations[i].key === 'positive') {
        this.data.motivations.push({
          name: result.motivations[i].question,
          active: 2,
          index: 3,
          key: result.motivations[i].key,
        });
      }

      if (result.motivations[i].key === 'promotion') {
        this.data.motivations.push({
          name: result.motivations[i].question,
          active: 1,
          index: 4,
          key: result.motivations[i].key,
        });
      } else if (result.motivations[i].key === 'recognition') {
        this.data.motivations.push({
          name: result.motivations[i].question,
          active: 2,
          index: 4,
          key: result.motivations[i].key,
        });
      }

      if (result.motivations[i].key === 'autonomous') {
        this.data.motivations.push({
          name: result.motivations[i].question,
          active: 1,
          index: 5,
          key: result.motivations[i].key,
        });
      } else if (result.motivations[i].key === 'clear_direction') {
        this.data.motivations.push({
          name: result.motivations[i].question,
          active: 2,
          index: 5,
          key: result.motivations[i].key,
        });
      }
    }

    this.setFormMotivationDataValue();
    this.setPreferredFormDataValue();
  }
  setPreferredFormDataValue() {
    // decisionStyles
    for (let i = 0; i < this.data.decisionStyles.length; i++) {
      if (this.data.decisionStyles[i].index === 1) {
        this.FActive = this.data.decisionStyles[i].active;
        this.FActiveString = this.data.decisionStyles[i].name;
      } else if (this.data.decisionStyles[i].index === 2) {
        this.SActive = this.data.decisionStyles[i].active;
        this.SActiveString = this.data.decisionStyles[i].name;
      } else if (this.data.decisionStyles[i].index === 3) {
        this.TActive = this.data.decisionStyles[i].active;
        this.TActiveString = this.data.decisionStyles[i].name;
      }
    }
    // preferred deciaion
    this.directRangeAttitude =
      Number.parseFloat(this.data.directRangeAttitude.toString()) * 2;
    this.resultsRangeAttitude =
      Number.parseFloat(this.data.resultsRangeAttitude.toString()) * 2;
    this.inspiringRangeAttitude =
      Number.parseFloat(this.data.inspiringRangeAttitude.toString()) * 2;
    this.balancedRangeAttitude =
      Number.parseFloat(this.data.balancedRangeAttitude.toString()) * 2;
    this.perspectiveRangeAttitude =
      Number.parseFloat(this.data.perspectiveRangeAttitude.toString()) * 2;
    this.focusedRangeAttitude =
      Number.parseFloat(this.data.focusedRangeAttitude.toString()) * 2;
  }
  setFormMotivationDataValue() {
    for (let i = 0; i < this.data.motivations.length; i++) {
      if (this.data.motivations[i].index === 1) {
        this.firstActive = this.data.motivations[i].active;
        this.firstActiveString = this.data.motivations[i].name;
      } else if (this.data.motivations[i].index === 2) {
        this.secondActive = this.data.motivations[i].active;
        this.secondActiveString = this.data.motivations[i].name;
      } else if (this.data.motivations[i].index === 3) {
        this.thirdActive = this.data.motivations[i].active;
        this.thirdActiveString = this.data.motivations[i].name;
      } else if (this.data.motivations[i].index === 4) {
        this.fourthActive = this.data.motivations[i].active;
        this.fourthActiveString = this.data.motivations[i].name;
      } else if (this.data.motivations[i].index === 5) {
        this.fifthActive = this.data.motivations[i].active;
        this.fifthActiveString = this.data.motivations[i].name;
      }
    }
    this.repetitveRangeAttitude = Number.parseFloat(
      this.data.repetitveRangeAttitude.toString()
    );
    this.symanticRangeAttitude = Number.parseFloat(
      this.data.symanticRangeAttitude.toString()
    );
    this.bigpictureRangeAttitude = Number.parseFloat(
      this.data.bigpictureRangeAttitude.toString()
    );
    this.firstresultRangeAttitude = Number.parseFloat(
      this.data.firstresultRangeAttitude.toString()
    );
    this.maintainRangeAttitude = Number.parseFloat(
      this.data.maintainRangeAttitude.toString()
    );
    this.creativityRangeAttitude = Number.parseFloat(
      this.data.creativityRangeAttitude.toString()
    );
    this.beingRangeAttitude = Number.parseFloat(
      this.data.beingRangeAttitude.toString()
    );
    this.helpingRangeAttitude = Number.parseFloat(
      this.data.helpingRangeAttitude.toString()
    );
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
      this.router.navigate(['/profile/add-experiences', this.id], {
        relativeTo: this.route,
      });
    } else {
      this.router.navigate(['/profile/add-experiences'], {
        relativeTo: this.route,
      });
    }
  }
  dataPassing() {
    this.data.decisionStyles = [];
    this.data.motivations = [];
    if (this.FActive !== 0) {
      this.data.decisionStyles.push({
        name: this.FActiveString,
        active: this.FActive,
        index: 1,
        key: this.FActive === 1 ? 'independent' : 'with_others',
      });
    }
    if (this.SActive !== 0) {
      this.data.decisionStyles.push({
        name: this.SActiveString,
        active: this.SActive,
        index: 2,
        key: this.SActive === 1 ? 'fact_based_analytics' : 'fast',
      });
    }
    if (this.TActive !== 0) {
      this.data.decisionStyles.push({
        name: this.TActiveString,
        active: this.TActive,
        index: 3,
        key: this.TActive === 1 ? 'according_rules' : 'find_solution',
      });
    }

    if (this.firstActive !== 0) {
      this.data.motivations.push({
        name: this.firstActiveString,
        active: this.firstActive,
        index: 1,
        key: this.firstActive === 1 ? 'risk_taking' : 'stability',
      });
    }
    if (this.secondActive !== 0) {
      this.data.motivations.push({
        name: this.secondActiveString,
        active: this.secondActive,
        index: 2,
        key: this.secondActive === 1 ? 'specialist_sme' : 'working_team',
      });
    }
    if (this.thirdActive !== 0) {
      this.data.motivations.push({
        name: this.thirdActiveString,
        active: this.thirdActive,
        index: 3,
        key: this.thirdActive === 1 ? 'independent' : 'positive',
      });
    }
    if (this.fourthActive !== 0) {
      this.data.motivations.push({
        name: this.fourthActiveString,
        active: this.fourthActive,
        index: 4,
        key: this.fourthActive === 1 ? 'promotion' : 'recognition',
      });
    }
    if (this.fifthActive !== 0) {
      this.data.motivations.push({
        name: this.fifthActiveString,
        active: this.fifthActive,
        index: 5,
        key: this.fifthActive === 1 ? 'autonomous' : 'clear_direction',
      });
    }
    console.log(this.data);
    this.saveApiCall();

  }
  saveApiCall() {
    let data1: any;
    const decision_style: any[] = [];
    for (let i = 0; i < this.data.decisionStyles.length; i++) {
      decision_style.push({
        question: this.data.decisionStyles[i].name,
        value: 2,
        key: this.data.decisionStyles[i].key,
      });
    }

    const communication_style: any[] = [
      {
        question: 'Direct, fast, fact based',
        value: this.data.directRangeAttitude,
        key: 'direct',
      },
    ];
    communication_style.push({
      question: 'Results focused',
      value: this.data.resultsRangeAttitude,
      key: 'result_focused',
    });
    communication_style.push({
      question: 'Inspiring and motivating',
      value: this.data.inspiringRangeAttitude,
      key: 'inspiring',
    });
    communication_style.push({
      question: 'Balanced listening and talking',
      value: this.data.balancedRangeAttitude,
      key: 'balance_communication',
    });
    communication_style.push({
      question: 'Considerate of others perspectives',
      value: this.data.perspectiveRangeAttitude,
      key: 'considerate_others_perspective',
    });
    communication_style.push({
      question: 'Focused keeping to the subject',
      value: this.data.focusedRangeAttitude,
      key: 'focused_to_subject',
    });

    const work: any[] = [
      {
        question: 'Repetitive routines and processes',
        value: this.data.repetitveRangeAttitude,
        key: 'repetitive_process',
      },
    ];
    work.push({
      question: 'Systematic and detailed planning',
      value: this.data.symanticRangeAttitude,
      key: 'systematic_planning',
    });
    work.push({
      question: 'Big picture, minimal instructions',
      value: this.data.bigpictureRangeAttitude,
      key: 'big_picture',
    });
    work.push({
      question: 'Results come first before everything',
      value: this.data.firstresultRangeAttitude,
      key: 'result_set',
    });
    work.push({
      question: 'Maintaining multiple relationships',
      value: this.data.maintainRangeAttitude,
      key: 'multiple_relationship',
    });
    work.push({
      question: 'Creativity in finding new solutions',
      value: this.data.creativityRangeAttitude,
      key: 'creativity',
    });
    work.push({
      question: 'Being positive and optimistic',
      value: this.data.beingRangeAttitude,
      key: 'being_positive',
    });
    work.push({
      question: 'Helping and guiding others',
      value: this.data.helpingRangeAttitude,
      key: 'helping_others',
    });

    let motivations: any[];
    motivations = [];
    for (let i = 0; i < this.data.motivations.length; i++) {
      motivations.push({
        question: this.data.motivations[i].name,
        value: 2,
        key: this.data.motivations[i].key,
      });
    }

    data1 = {
      first_name: this.data.first_name,
      last_name: this.data.last_name,
      alternateEmail: this.data.alternateEmail,
      decision_style: decision_style,
      communication_style: communication_style,
      work: work,
      motivations: motivations,
    };
    console.log('data', data1);
    this.authservice
      .postDataString(constants.getAndSetProfile + '/' + this.id, data1)
      .subscribe(
        (result) => {
          console.log('resultMyProfile: ', result);
          this.setValue(
            constants.profileStorageModel,
            JSON.stringify(result.data)
          );
        },
        (error) => {
          console.log('Error', error);
        }
      );
  }
  back() {
    if (this.id) {
      this.dataPassing();
      this.router.navigate(['/profile/add-skills', this.id], {
        relativeTo: this.route,
      });
    } else {
      this.router.navigate(['/profile/add-skills'], { relativeTo: this.route });
    }
  }
}
