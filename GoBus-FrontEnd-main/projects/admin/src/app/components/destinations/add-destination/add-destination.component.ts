import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DestinationService } from '../../../services/destination/destination.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IResponse } from '../../../models/iresponse';

@Component({
  selector: 'app-add-destination',
  templateUrl: './add-destination.component.html',
  styleUrls: ['./add-destination.component.scss'],
})
export class AddDestinationComponent implements OnInit {
  destinationForm: FormGroup;
  selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private destinationService: DestinationService,
    private dialog: MatDialogRef<AddDestinationComponent>,
    private toastr: ToastrService
  ) {
    this.destinationForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-z_ ]{3,}')]],
    });
  }
  ngOnInit(): void {}

  SelectImage(event: any) {
    this.selectedFile = event.target.files[0];
  }

  Add() {
    let formData = new FormData();

    formData.append('name', this.name?.value);
    formData.append('file', this.selectedFile);

    this.destinationService.AddDestination(formData).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.toastr.success(response.messages.toString());
        this.dialog.close(true);
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  get name() {
    return this.destinationForm.get('name');
  }
}
