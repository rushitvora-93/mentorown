import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemoMaterialModule } from '../demo-material-module';
import { ResumeRoutingModule } from './resume-routing.module';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { AddResumeFirstComponent } from './add-resume-first/add-resume-first.component';
import { AddResumeSecondComponent } from './add-resume-second/add-resume-second.component';
import { ReportGenrationComponent } from './report-genration/report-genration.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RichTextEditorComponent } from './rich-text-editor/rich-text-editor.component';
import { FroalaViewModule, FroalaEditorModule } from 'angular-froala-wysiwyg';
import 'froala-editor/js/third_party/font_awesome.min';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/js/plugins/align.min.js';
import 'froala-editor/js/languages/de.js';
import 'froala-editor/js/third_party/image_tui.min';
import 'froala-editor/js/third_party/spell_checker.min';
import 'froala-editor/js/third_party/embedly.min';

@NgModule({
  declarations: [ResumeListComponent, AddResumeFirstComponent, AddResumeSecondComponent, ReportGenrationComponent, RichTextEditorComponent],
  imports: [
    CommonModule,
    ResumeRoutingModule,
    DemoMaterialModule,
    FormsModule,
    ReactiveFormsModule,
    FroalaViewModule,
    FroalaEditorModule
  ]
})
export class ResumeModule { }
