import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from '../../../services/branch/branch.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IBranchAdd } from '../../../models/branch/ibranch-add';
import { IResponse } from '../../../models/iresponse';
import { DestinationService } from '../../../services/destination/destination.service';
import { IDestinationRead } from '../../../models/destination/idestination-read';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.scss'],
})
export class AddBranchComponent implements OnInit {
  branchForm: FormGroup;
  destinations: IDestinationRead[] = [];
  constructor(
    private fb: FormBuilder,
    private destinationService: DestinationService,
    private branchService: BranchService,
    private dialog: MatDialogRef<AddBranchComponent>,
    private toastr: ToastrService
  ) {
    this.branchForm = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.pattern('[A-Za-z0-9_ ]{3,}')],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^[a-zA-Z0-9_ !@#$%^&*’“”'".()_+\-=\[\]{};':"\\|,.<>\/?]*$/
          ),
        ],
      ],
      phone: ['', [Validators.required, Validators.pattern('[0-9]{11}')]],
      destinationId: [1, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.GetAllDestinations();
  }
  Add() {
    let branch: IBranchAdd = this.branchForm.value;

    this.branchService.AddBranch(branch).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.toastr.success(response.messages.toString());
        this.dialog.close(true);
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  GetAllDestinations() {
    this.destinationService.GetAllDestinations().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.destinations = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

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
