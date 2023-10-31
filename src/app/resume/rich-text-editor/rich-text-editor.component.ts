import { Component, OnInit, ViewChild, Input, ElementRef } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import * as constants from '../../utils/Constants';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';
import { FroalaEditorModule } from 'angular-froala-wysiwyg';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-rich-text-editor',
  templateUrl: './rich-text-editor.component.html',
  styleUrls: ['./rich-text-editor.component.css']
})
export class RichTextEditorComponent implements OnInit {
  htmlContent;
  myForm: FormGroup;
  id;
  items = [];
  nodata;
  temp;
  userID = localStorage.getItem('userId');
  report = localStorage.getItem('report_title');
  froalaEditors: Array<FroalaEditorModule> = [];
  specs: FroalaEditorModule = {
    editable: true
 };
  @ViewChild('editor' , {static: false}) editor: ElementRef;
  @ViewChild('decorate' , {static: false}) decorate: ElementRef;
  @ViewChild('styler' , {static: false}) styler: ElementRef;

  @Input() formControlItem: FormControl;

  @Input() placeholderText: string;
  constructor(private authService: AuthService,
              private router: Router,
              private toastService: ToastrService,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
                const urlid = this.route.snapshot.params;
                this.id = urlid.id;
                console.log('url id', urlid.id);
   }

  ngOnInit() {
    this.myForm = this.formBuilder.group({
      formModels: this.formBuilder.array([]),
    });
    this.getData();
  }
  initUserRow(): FormGroup {
    return this.formBuilder.group({
      formModel: [],
    });
  }

  addUserRow(): void {
    const usersArray = <FormArray>this.myForm.controls['formModels'];
    usersArray.push(this.initUserRow());
  }
  getControls() {
    return (this.myForm.get('formModels') as FormArray).controls;
  }
  getData() {
    let data ={
      type: 'doc'
    }
    console.log(this.id);
    // const body = new URLSearchParams();
    // body.set('type', type);
    // console.log('------', type);
    this.authService.setLoader(true);
    this.authService.postDataReport(constants.getReportResume + this.userID + '/' + this.id , data).subscribe((result) => {
      this.authService.setLoader(false);
        console.log('result', result);
        const editorConfig: FroalaEditorModule = {
          htmlRemoveTags: ['meta'],
          multiLine: true,
          fullPage: true,
          spellcheck: false
        };
        this.froalaEditors.push(editorConfig);
        console.log('report', this.report);
        if ( result.length == 0) {
          this.items.push({
            file_html: '<h3>Response is empty</h3>'
          });
          this.addUserRow();
        } else {
          if (result.data.length > 0) {
                for (let i = 0; i < result.data.length; i++) {
                  this.nodata = true;
                  if ( this.report == result.data[i].report_title) {
                    this.items.push({
                      file_html: result.data[i].file_html,
                      report_title: result.data[i].report_title,
                    });
                    this.nodata = false;
                  }
                }
                if ( this.nodata == true) {
                  this.items.push({
                    file_html: '<h3>Data is not available</h3>'
                  });
                }
              this.addUserRow();
              }
            // this.myForm.patchValue({'htmlContent': this.items[0].file_html});
            // console.log(this.items[0].file_html);
          console.log('items of API response', this.items);
        }
    },
    (err) => {
    console.log('err', err);
    });
  }
  onSubmit(value) {
    // console.log('==============', value.formModels[0].formModel);
    const fileArray = [];
      fileArray.push({
        report_title: this.items[0].report_title,
        file_html: value.formModels[0].formModel
      });
    console.log({file: fileArray});
    this.authService.postDataReport(constants.postResumeUpdateReport + this.id, {file: fileArray})
    .subscribe((res) => {
      this.router.navigate(['/resume/resume-gen', this.id], { relativeTo: this.route });
      });
  }
  previous() {
    if (this.id) {
      this.router.navigate(['/resume/resume-gen', this.id], { relativeTo: this.route });
    } else {
      this.router.navigate(['/resume/resume-gen'], { relativeTo: this.route });
    }
  }
  getPlaceholderText() {
    if (this.placeholderText !== undefined) {
      return this.placeholderText;
    }
    return '';
  }

  // tslint:disable-next-line: member-ordering
  uniqueId = `editor${Math.floor(Math.random() * 1000000)}`;

  // tslint:disable-next-line: member-ordering
  private stringTools = {
    isNullOrWhiteSpace: (value: string) => {
      if (value == null || value === undefined) {
        return true;
      }
      value = value.replace(/[\n\r]/g, '');
      value = value.split(' ').join('');
      return value.length === 0;
    },
  };

}


