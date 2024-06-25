import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUserRead } from '../../../models/user/iuser-read';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailsComponent implements OnInit {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<UserDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUserRead
  ) {
    this.userForm = this.fb.group({
      firstName: [data?.firstName || ''],
      lastName: [data?.lastName || ''],
      userName: [data?.userName || ''],
      email: [data?.email || ''],
      phoneNumber: [data?.phoneNumber || ''],
    });
  }
  ngOnInit(): void {}

  get firstName() {
    return this.userForm.get('firstName');
  }
  get lastName() {
    return this.userForm.get('lastName');
  }
  get userName() {
    return this.userForm.get('userName');
  }
  get email() {
    return this.userForm.get('email');
  }
  get phoneNumber() {
    return this.userForm.get('phoneNumber');
  }
}
