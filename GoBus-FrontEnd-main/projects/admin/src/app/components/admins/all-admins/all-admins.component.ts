import { Component, OnInit } from '@angular/core';
import { IUserRead } from '../../../models/user/iuser-read';
import { AdminService } from '../../../services/admin/admin.service';
import { MatDialog } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';
import { AddAdminComponent } from '../add-admin/add-admin.component';
import { AdminDetailsComponent } from '../admin-details/admin-details.component';
import { DeleteAdminComponent } from '../delete-admin/delete-admin.component';

@Component({
  selector: 'app-all-admins',
  templateUrl: './all-admins.component.html',
  styleUrls: ['./all-admins.component.scss']
})

export class AllAdminsComponent implements OnInit {
  admins: IUserRead[] = [];

  constructor(private adminService: AdminService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.GetAllAdmins();
  }
  GetAllAdmins() {
    this.adminService.GetAllAdmins().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.admins = response.data;
        console.log(response)
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  AddDriver() {
    const dialogRef = this.dialog.open(AddAdminComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllAdmins();
      }
    });
  }

  AdminDetails(user: IUserRead) {
    const dialogRef = this.dialog.open(AdminDetailsComponent, {
      width: '750px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllAdmins();
      }
    });
  }

  DeleteAdmin(userId: string) {
    const dialogRef = this.dialog.open(DeleteAdminComponent, {
      width: '750px',
      data: userId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllAdmins();
      }
    });
  }
}
