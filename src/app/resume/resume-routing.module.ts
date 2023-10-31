import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ResumeListComponent } from './resume-list/resume-list.component';
import { AuthGuard } from '../guards/auth.guard';
import { AddResumeFirstComponent } from './add-resume-first/add-resume-first.component';
import { AddResumeSecondComponent } from './add-resume-second/add-resume-second.component';
import { ReportGenrationComponent } from './report-genration/report-genration.component';
import { RichTextEditorComponent } from './rich-text-editor/rich-text-editor.component';

const routes: Routes = [
  {
    path: 'resume-list',
    canActivate: [AuthGuard],
    component: ResumeListComponent,
    data: { title: 'resume-list' },
  },
  {
    path: 'resume-list/:id',
    canActivate: [AuthGuard],
    component: ResumeListComponent,
    data: { title: 'resume-list' },
  },
  {
    path: 'resume-first',
    canActivate: [AuthGuard],
    component: AddResumeFirstComponent,
    data: { title: 'resume-first' },
  },
  {
    path: 'resume-first/:id',
    canActivate: [AuthGuard],
    component: AddResumeFirstComponent,
    data: { title: 'resume-first' },
  },
  {
    path: 'resume-second',
    canActivate: [AuthGuard],
    component: AddResumeSecondComponent,
    data: { title: 'resume-second' },
  },
  {
    path: 'resume-second/:id',
    canActivate: [AuthGuard],
    component: AddResumeSecondComponent,
    data: { title: 'resume-second' },
  },
  {
    path: 'resume-gen',
    canActivate: [AuthGuard],
    component: ReportGenrationComponent,
    data: { title: 'resume-gen' },
  },
  {
    path: 'resume-gen/:id',
    canActivate: [AuthGuard],
    component: ReportGenrationComponent,
    data: { title: 'resume-gen' },
  },
  {
    path: 'text-editor',
    canActivate: [AuthGuard],
    component: RichTextEditorComponent,
    data: { title: 'text-editor' },
  },
  {
    path: 'text-editor/:id',
    canActivate: [AuthGuard],
    component: RichTextEditorComponent,
    data: { title: 'text-editor' },
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResumeRoutingModule {}
