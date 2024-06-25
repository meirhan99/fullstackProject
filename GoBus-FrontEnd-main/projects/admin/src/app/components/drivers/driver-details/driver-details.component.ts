import { Component, OnInit,Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IUserRead } from '../../../models/user/iuser-read';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss']
})

export class DriverDetailsComponent implements OnInit {
  driverForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<DriverDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IUserRead
  ) {
    this.driverForm = this.fb.group({
      firstName: [data?.firstName || ''],
      lastName: [data?.lastName || ''],
      userName: [data?.userName || ''],
      email: [data?.email || ''],
      phoneNumber: [data?.phoneNumber || ''],
    });
  }
  ngOnInit(): void {}

  get firstName() {
    return this.driverForm.get('firstName');
  }
  get lastName() {
    return this.driverForm.get('lastName');
  }
  get userName() {
    return this.driverForm.get('userName');
  }
  get email() {
    return this.driverForm.get('email');
  }
  get phoneNumber() {
    return this.driverForm.get('phoneNumber');
  }
}
