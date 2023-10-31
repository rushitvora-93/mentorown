import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort, MatDialog } from '@angular/material';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import * as constants from '../../utils/Constants';
import { LocalStorageService } from 'angular-web-storage';
import { ConfirmationDialogComponent } from '../../material-component/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  displayedColumns: string[] = [
    'srNo',
    'first_name',
    'last_name',
    'email',
    'alternateEmail',
    'Action',
  ];
  dataSource: MatTableDataSource<PeriodicElement>;
  query: string;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  pageI = 0;
  show = false;
  constructor(
    private toastService: ToastrService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    public local: LocalStorageService,
    private dialog: MatDialog
  ) {
    this.getAllUser();
  }

  ngOnInit() {
    this.clear();
    // this.getAllUser();
  }
  getAllUser() {
    this.authService.setLoader(true);
    let dataUSer = [];
    this.authService.getData(constants.getusers).subscribe(
      (response) => {
        this.authService.setLoader(false);
        console.log(response);
        if (response.data) {
          console.log('Output', response.data);
          for (let i = 0; i < response.data.length; i++) {
            response.data[i].srNo = i + 1;
            dataUSer.push(response.data[i]);
          }
          this.dataSource = new MatTableDataSource(dataUSer);

          this.dataSource.sortingDataAccessor = (data, sortHeaderId) => {
            switch (sortHeaderId) {
              case 'srNo':
                return data.srNo;
              default:
                return data[sortHeaderId].toLowerCase();
            }
          };
          this.dataSource.sort = this.sort;
          this.paginator.pageSize = 10;
          this.dataSource.paginator = this.paginator;
          this.show = true;
        }
      },
      (err) => {
        this.authService.setLoader(false);
        this.toastService.error(err);
      }
    );
  }
  clear() {
    this.local.remove(constants.profileStorageModel);
    this.local.remove(constants.resumeModel);
    this.local.remove(constants.editResumeKey);
    localStorage.removeItem('report_title');
    localStorage.removeItem('setting_email');
    localStorage.removeItem('userId');
  }
  getprofile(id) {
    this.router.navigate(['../profile/profile-progress', id], {
      relativeTo: this.route,
    });
  }
  getResume(id) {
    this.router.navigate(['../resume/resume-list', id], {
      relativeTo: this.route,
    });
  }
  getSetting(id , email) {
    localStorage.setItem('setting_email' , email);
    this.router.navigate(['/settings', id], {
      relativeTo: this.route,
    });
  }
  applyFilter(event: Event) {
    console.log(event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  adduser() {
    this.router.navigate(['../profile/create-new-user'], {
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
        this.deleteUser(id);
      }
    });
  }
  deleteUser(id) {
    this.authService.setLoader(true);
    this.authService.postData('users/delete/' + id).subscribe(res => {
    if (res) {
    this.authService.setLoader(false);
    this.getAllUser();
    this.toastService.success('User Deleted successfully');
    }
    }, err => {
    this.authService.setLoader(false);
    this.toastService.error(err);
    });
  }
}
export interface PeriodicElement {
  srNo: string;
  first_name: string;
  last_name: string;
  email: string;
  alternateEmail: string;
}
