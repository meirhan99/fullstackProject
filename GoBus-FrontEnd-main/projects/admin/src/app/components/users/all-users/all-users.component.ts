import { Component, OnInit } from '@angular/core';
import { IUserRead } from '../../../models/user/iuser-read';
import { UserService } from '../../../services/user/user.service';
import { MatDialog } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';
import { UserDetailsComponent } from '../user-details/user-details.component';
import { DeleteUserComponent } from '../delete-user/delete-user.component';
import { BlockUserComponent } from '../block-user/block-user.component';

@Component({
  selector: 'app-all-users',
  templateUrl: './all-users.component.html',
  styleUrls: ['./all-users.component.scss'],
})
export class AllUsersComponent implements OnInit {
  users: IUserRead[] = [];

  constructor(private userService: UserService, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.GetAllUsers();
  }
  GetAllUsers() {
    this.userService.GetAllUsers().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.users = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  UserDetails(user: IUserRead) {
    const dialogRef = this.dialog.open(UserDetailsComponent, {
      width: '750px',
      data: user,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllUsers();
      }
    });
  }

  DeleteUser(userId: string) {
    const dialogRef = this.dialog.open(DeleteUserComponent, {
      width: '750px',
      data: userId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllUsers();
      }
    });
  }
  BlockUser(user: IUserRead) {
    const dialogRef = this.dialog.open(BlockUserComponent, {
      width: '750px',
      data: user,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllUsers();
      }
    });
  }
}
