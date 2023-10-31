import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import * as constants from '../../utils/Constants';
import { ProfileStorageModel } from '../../model/ProfileStorageModel';
import { LocalStorageService } from 'angular-web-storage';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { ConfirmationDialogComponent } from '../../material-component/confirmation-dialog/confirmation-dialog.component';
import { DialogComponent } from '../../material-component/dialog/dialog.component';

@Component({
  selector: 'app-resume-list',
  templateUrl: './resume-list.component.html',
  styleUrls: ['./resume-list.component.css'],
})
export class ResumeListComponent implements OnInit {
  displayedColumns: string[] = [
    'srNo',
    'resume_title',
    'folder_name',
    'Action',
  ];
  dataSource: MatTableDataSource<PeriodicElement>;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  id;
  show = false;
  myProfielData: ProfileStorageModel = new ProfileStorageModel();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public local: LocalStorageService,
    private toastService: ToastrService,
    private dialog: MatDialog
  ) {
    const urlid = this.route.snapshot.params;
    this.id = urlid.id;
    console.log('url id', urlid.id);
    localStorage.setItem('userId', this.id);
  }

  ngOnInit() {
    this.getAllResume();
    this.clear();
  }
  editResume(id) {
    this.router.navigate(['/resume/resume-first', id], {
      relativeTo: this.route,
    });
  }
  openDialog(id) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      data: {
        message: 'Are you sure want to delete?',
        buttonText: {
          ok: 'Yes',
          cancel: 'No'
        }
      }
    });

    dialogRef.afterClosed().subscribe((confirmed: boolean) => {
      if (confirmed) {
        this.deleteResume(id);
      }
    });
  }
  deleteResume(id) {
    console.log(id);
    const data = {
        resumeId : id,
        a_ction : 'delete'
      };
      this.authService.setLoader(true);
      this.authService.postDataReport(constants.changeaction, data).subscribe((result => {
        this.authService.setLoader(false);
        // console.log("result",result);
        this.toastService.success('Resume is deleted');
        this.getAllResume();
      }), (err => {
        this.authService.setLoader(false);
        console.log('err', err);
      }));
  }
  downloadResume(id) {
    this.router.navigate(['/resume/resume-gen', id], { relativeTo: this.route });
  }
  openDialogshare(id) {
    const dialogRef = this.dialog.open(DialogComponent);

    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.shareResume(data, id);
      }
    });
  }
  shareResume(data, id) {
    let finaldata = {
      email: data.email,
      resume_id: id
    };
    console.log('emaillllllll',finaldata);
    this.authService.setLoader(true);
    this.authService.postDataReport(constants.shareResume + this.id, finaldata).subscribe(res => {
      this.authService.setLoader(false);
      console.log('Share resume response', res);
      this.toastService.success('Resume shared successfully.')
    }, (error) => {
      this.authService.setLoader(false);
      this.toastService.error(error);
      // console.log('error', error);
    });
  }
  addResume() {
    this.router.navigate(['/resume/resume-first'], { relativeTo: this.route });
  }
  clear() {
    this.local.remove(constants.resumeModel);
  }
  setValue(key: string, value: any) {
    this.local.set(key, value);
  }
  getAllResume() {
    this.authService.setLoader(true);
    this.authService
      .getDataWithoutString(constants.listResume + this.id)
      .subscribe(
        (result) => {
          console.log('API:listResume:DATA:', result);
          this.authService.setLoader(false);
          if (result.data != null) {
            let k = 0;
            const resumelist = [];
            for (let j = 0; j < result.data.length; j++) {
              for (let i = 0; i < result.data[j].resume.length; i++) {
                const data1 = {
                  srNo: k + 1,
                  id: result.data[j].resume[i].rId,
                  folder_name: result.data[j].name,
                  resume_title: result.data[j].resume[i].job_title,
                };
                k++;
                resumelist.push(data1);
              }
            }
            console.log('finallll', resumelist);
            this.dataSource = new MatTableDataSource(resumelist);
            this.dataSource.sort = this.sort;
            this.paginator.pageSize = 10;
            this.dataSource.paginator = this.paginator;
            this.show = true;
          }
        },
        (error) => {
          this.authService.setLoader(false);
          console.log('error', error);
        }
      );
  }
}
export interface PeriodicElement {
  id: String;
  srNo: string;
  resume_title: string;
  folder_name: string;
}
