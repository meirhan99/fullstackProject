import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IDestinationRead } from '../../../models/destination/idestination-read';

@Component({
  selector: 'app-destination-details',
  templateUrl: './destination-details.component.html',
  styleUrls: ['./destination-details.component.scss'],
})
export class DestinationDetailsComponent implements OnInit {
  destinationForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<DestinationDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IDestinationRead
  ) {
    this.destinationForm = this.fb.group({
      name: [data?.name || ''],
      imageURL: [data?.imageURL || ''],
    });
  }
  ngOnInit(): void {}

  get name() {
    return this.destinationForm.get('name');
  }
  get imageURL() {
    return this.destinationForm.get('imageURL');
  }
}
