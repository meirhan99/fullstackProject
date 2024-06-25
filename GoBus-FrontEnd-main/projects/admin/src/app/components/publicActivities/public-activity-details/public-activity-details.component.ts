import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPublicActivityRead } from '../../../models/publicActivity/ipublic-activity-read';

@Component({
  selector: 'app-public-activity-details',
  templateUrl: './public-activity-details.component.html',
  styleUrls: ['./public-activity-details.component.scss'],
})
export class PublicActivityDetailsComponent implements OnInit {
  publicActivityForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<PublicActivityDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPublicActivityRead
  ) {
    this.publicActivityForm = this.fb.group({
      title: [data?.title || ''],
      description: [data?.description || ''],
      destinationName: [data?.destinationName || ''],
      imageURL: [data?.imageURL || ''],
    });
  }
  ngOnInit(): void {}

  get title() {
    return this.publicActivityForm.get('title');
  }
  get description() {
    return this.publicActivityForm.get('description');
  }
  get destinationName() {
    return this.publicActivityForm.get('destinationName');
  }
  get imageURL() {
    return this.publicActivityForm.get('imageURL');
  }
}
