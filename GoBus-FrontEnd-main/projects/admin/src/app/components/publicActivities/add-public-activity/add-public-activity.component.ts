import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { MatDialogRef } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';
import { PublicActivityService } from '../../../services/publicActivity/public-activity.service';
import { IDestinationRead } from '../../../models/destination/idestination-read';
import { DestinationService } from '../../../services/destination/destination.service';

@Component({
  selector: 'app-add-public-activity',
  templateUrl: './add-public-activity.component.html',
  styleUrls: ['./add-public-activity.component.scss'],
})
export class AddPublicActivityComponent implements OnInit {
  publicActivityForm: FormGroup;
  destinations: IDestinationRead[] = [];
  selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private publicActivityService: PublicActivityService,
    private destinationService: DestinationService,
    private dialog: MatDialogRef<AddPublicActivityComponent>,
    private toastr: ToastrService
  ) {
    this.publicActivityForm = this.fb.group({
      title: [
        '',
        [Validators.required, Validators.pattern('[a-zA-z0-9_ ]{3,}')],
      ],
      description: [
        '',
        [Validators.required, Validators.pattern('[a-zA-z0-9_ ]{3,}')],
      ],
      destinationId: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.GetAllDestinations();
  }

  SelectImage(event: any) {
    this.selectedFile = event.target.files[0];
  }

  Add() {
    let formData = new FormData();
    formData.append('title', this.title?.value);
    formData.append('description', this.description?.value);
    formData.append('destinationId', this.destinationId?.value);
    formData.append('file', this.selectedFile);

    this.publicActivityService.AddPublicActivity(formData).subscribe({
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

  get title() {
    return this.publicActivityForm.get('title');
  }
  get description() {
    return this.publicActivityForm.get('description');
  }
  get destinationId() {
    return this.publicActivityForm.get('destinationId');
  }
}
