import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IBranchRead } from '../../../models/branch/ibranch-read';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-branch-details',
  templateUrl: './branch-details.component.html',
  styleUrls: ['./branch-details.component.scss'],
})
export class BranchDetailsComponent implements OnInit {
  branchForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialog: MatDialogRef<BranchDetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBranchRead
  ) {

    this.branchForm = this.fb.group({
      name: [data?.name || ''],
      address: [data?.address || ''],
      phone: [data?.phone || ''],
      destinationId: [data?.destinationId || ''],
    });
  }
  ngOnInit(): void {}

  get name() {
    return this.branchForm.get('name');
  }
  get address() {
    return this.branchForm.get('address');
  }
  get phone() {
    return this.branchForm.get('phone');
  }
  get destinationId() {
    return this.branchForm.get('destinationId');
  }
}
