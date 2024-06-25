import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBusClassDetails } from '../../../models/busClass/ibus-class-details';

@Component({
  selector: 'app-bus-class-details',
  templateUrl: './bus-class-details.component.html',
  styleUrls: ['./bus-class-details.component.scss'],
})
export class BusClassDetailsComponent implements OnInit {
  busClassForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<BusClassDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBusClassDetails
  ) {
    this.busClassForm = this.fb.group({
      name: [data?.name || ''],
      averagePrice: [data?.averagePrice || ''],
      busesNumbers: [data?.busesNumbers || ''],
      classImageURLs: [data?.classImageURLs || ''],
    });
  }
  ngOnInit(): void {}

  get name() {
    return this.busClassForm.get('name');
  }
  get averagePrice() {
    return this.busClassForm.get('averagePrice');
  }
  get busesNumbers() {
    return this.busClassForm.get('busesNumbers');
  }
  get classImageURLs() {
    return this.busClassForm.get('classImageURLs');
  }
}
