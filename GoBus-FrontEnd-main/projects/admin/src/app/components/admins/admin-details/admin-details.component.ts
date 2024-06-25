import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUserRead } from '../../../models/user/iuser-read';

@Component({
  selector: 'app-admin-details',
  templateUrl: './admin-details.component.html',
  styleUrls: ['./admin-details.component.scss']
})

export class AdminDetailsComponent implements OnInit {
  adminForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<AdminDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUserRead
  ) {
    this.adminForm = this.fb.group({
      firstName: [data?.firstName || ''],
      lastName: [data?.lastName || ''],
      userName: [data?.userName || ''],
      email: [data?.email || ''],
      phoneNumber: [data?.phoneNumber || ''],
    });
  }
  ngOnInit(): void {}

  get firstName() {
    return this.adminForm.get('firstName');
  }
  get lastName() {
    return this.adminForm.get('lastName');
  }
  get userName() {
    return this.adminForm.get('userName');
  }
  get email() {
    return this.adminForm.get('email');
  }
  get phoneNumber() {
    return this.adminForm.get('phoneNumber');
  }
}
