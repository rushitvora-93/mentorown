import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import * as constants from '../../utils/Constants';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  users = [];
  selected_email;
  constructor(@Inject(MAT_DIALOG_DATA) private data: any,
  private dialogRef: MatDialogRef<DialogComponent>,
  private authservice: AuthService,
  private toastService: ToastrService) { }

  ngOnInit() {
    this.getAllUser();
  }
  getAllUser() {
   this.authservice.setLoader(true);
    this.authservice.getData(constants.getusers).subscribe(
      (response) => {
        this.authservice.setLoader(false);
        for ( let i = 0; i < response.data.length; i++) {
          this.users.push({
            email: response.data[i].email});
        }
      },
      (err) => {
        this.authservice.setLoader(false);
        this.toastService.error(err);
      }
    );
  }
  selected(email) {
    this.selected_email = email;
  }
  ok() {
    let data = {
      email: this.selected_email
    }
    this.dialogRef.close(data);
  }
}
