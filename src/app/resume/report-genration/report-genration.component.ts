import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { ResumeModel } from '../../model/ResumeModel';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import * as constants from '../../utils/Constants';
import { report } from 'process';
import { LocalStorageService } from 'angular-web-storage';
import * as jsPDF from 'jspdf';
import { DomSanitizer } from '@angular/platform-browser';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-report-genration',
  templateUrl: './report-genration.component.html',
  styleUrls: ['./report-genration.component.css']
})
export class ReportGenrationComponent implements OnInit {
  data: ResumeModel = new ResumeModel();
  pdfs = [];
  id;
  value;
  first = false;
  second = false;
  third = false;
  fourth = false;
  fifth = false;
  sixth = false;
  downloadUrl;
  pdfName = [];
  fileName;
  filePreview;
  content;
  fileContent;
  selectedReport;
  userID = localStorage.getItem('userId');
  report = localStorage.getItem('report_title');
  private trueFormControl = new FormControl(false);
  private falseFormControl = new FormControl(false);

  constructor(private router: Router,
              private route: ActivatedRoute,
              private toastService: ToastrService,
              private authService: AuthService,
              public local: LocalStorageService, private sanitizer: DomSanitizer) {
                const urlid = this.route.snapshot.params;
                this.id = urlid.id;
                console.log('url id', urlid.id);

                this.pdfs.push({
                  report_title: 'short_bio',
                  file_name: 'Short Bio'
                });
                this.pdfs.push({
                  report_title: 'linkedin',
                  file_name: 'LinkedIn Bio'
                });
                this.pdfs.push({
                  report_title: 'introduction',
                  file_name: 'Introduction'
                });
                this.pdfs.push({
                  report_title: 'resume',
                  file_name: 'Resume'
                });
                this.pdfs.push({
                  report_title: 'ace_interview',
                  file_name: 'Ace the Interview'
                });
  }

  ngOnInit() {
    this.getResumeDetail();
    console.log('report', this.report);
  }
  getResumeDetail() {
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
            this.getData();
          },
          (err) => {
            console.log(err);
            this.authService.setLoader(false);
          });
  }
  getData() {
    this.value = this.local.get(constants.resumeModel);
      if (this.value) {
        this.data = new ResumeModel(JSON.parse((this.value).toString()));
        this.data.role_name = this.data.job_title;
        this.data.pdf = false;
        this.data.word = false;
        if (this.report == null) {
          this.first = true;
          this.selectedReport = 'short_bio';
        } else {
          this.selectedReport = this.report;
          if ( this.selectedReport == 'short_bio') {
            this.first = true;
          } else if (this.selectedReport == 'linkedin') {
            this.second = true;
          } else if (this.selectedReport == 'introduction') {
            this.third = true;
          } else if (this.selectedReport == 'resume') {
            this.fourth = true;
          } else {
            this.fifth = true;
          }
        }
        // this.pdfName.push('short_bio');
      }
  }
  generatePdf() {
    window.open(this.downloadUrl);
  }
  checkChange(key)  {
    if (key === 1) {
      this.check(true, false, false, false, false, 0);
    } else if (key === 2) {
      this.check(false, true, false, false, false, 1);
    } else if (key === 3) {
      this.check(false, false, true, false, false, 2);
    } else if (key === 4) {
      this.check(false, false, false, true, false, 3);
    } else if (key === 5) {
      this.check(false, false, false, false, true, 4);
    }
  }

  check(first, second, third, fourth, fifth, pos) {
    this.first = first;
    this.second = second;
    this.third = third;
    this.fourth = fourth;
    this.fifth = fifth;
    if ( this.first == true) {
      this.selectedReport = this.pdfs[0].report_title;
    } else if (this.second == true) {
      this.selectedReport = this.pdfs[1].report_title;
    } else if (this.third == true) {
      this.selectedReport = this.pdfs[2].report_title;
    } else if (this.fourth == true) {
      this.selectedReport = this.pdfs[3].report_title;
    } else {
      this.selectedReport = this.pdfs[4].report_title;
    }
    console.log('first', this.first);
    console.log('second', this.second);
    console.log('third', this.third);
    console.log('fourth', this.fourth);
    console.log('fifth', this.fifth);
    console.log('==============');
  }
  checkPdfWord(key)  {
    if (key === 1) {
      this.checkPW(true, false);
    } else if (key === 2) {
      this.checkPW(false, true);
    }
  }
  checkPW(pdf , word) {
    this.data.pdf = pdf;
    this.data.word = word;
  }
  setValue(key: string, value: any) {
    this.local.set(key, value);
  }
  generate() {
    localStorage.removeItem('report_title');
    this.router.navigate(['/resume/resume-list' , this.userID], { relativeTo: this.route });
  }
  previous() {
      this.setValue(constants.resumeModel, JSON.stringify(this.data));
      console.log(this.data);
      this.router.navigate(['/resume/resume-second', this.id], {
        relativeTo: this.route,
      });
  }
  print() {
    let type;
    if (this.data.role_name === '' || this.data.role_name == null) {
      this.toastService.warning('please enter role name');
    } else if (this.data.pdf === true || this.data.word == true) {
      if (this.data.pdf == true) {
        type = 'pdf';
      } 
      if (this.data.word == true) {
        type = 'doc';
      }
      const fileArray = [];
        fileArray.push({
          'file_name' :  this.selectedReport
        });
      const data1 = {
        role_name: this.data.role_name,
        type: type,
        file : fileArray
      };
      this.authService.setLoader(true);
      this.authService.postDataReport(constants.resumesfiledownload + this.userID  + '/' + this.id , data1).subscribe((result) => {
        this.authService.setLoader(false);
            console.log('result', result);
            this.pdfName = [];
            if (this.data.word === true) {
              if (this.id) {
                localStorage.setItem('report_title', this.selectedReport);
                this.router.navigate(['/resume/text-editor', this.id], { relativeTo: this.route });
              } else {
                this.router.navigate(['/resume/text-editor'], { relativeTo: this.route });
              }
            } else {
              this.pdfName.push({
                file_name:  result.data[0].file_name,
                report_title: result.data[0].report_title
              });

              console.log('=======', this.pdfName);
              this.downloadUrl = this.pdfName[0].file_name;
              console.log('pdfName', this.pdfName);
              console.log('downloadUrl', this.downloadUrl);
              this.generatePdf();
            }
          },
          (error => {
            this.authService.setLoader(false);
            console.log('error:downloadFileResume', error);
          }));
    } else if (!this.data.pdf && !this.data.word) {
      this.toastService.warning('Select File type');
    }
  }
}
