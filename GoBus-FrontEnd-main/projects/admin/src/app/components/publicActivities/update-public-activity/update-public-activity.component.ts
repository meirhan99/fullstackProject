import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PublicActivityService } from '../../../services/publicActivity/public-activity.service';
import { DestinationService } from '../../../services/destination/destination.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IPublicActivityRead } from '../../../models/publicActivity/ipublic-activity-read';
import { IResponse } from '../../../models/iresponse';
import { IDestinationRead } from '../../../models/destination/idestination-read';

@Component({
  selector: 'app-update-public-activity',
  templateUrl: './update-public-activity.component.html',
  styleUrls: ['./update-public-activity.component.scss'],
})
export class UpdatePublicActivityComponent {
  publicActivityForm: FormGroup;
  destinations: IDestinationRead[] = [];

  selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private publicActivityService: PublicActivityService,
    private destinationService: DestinationService,
    private toastr: ToastrService,
    public dialog: MatDialogRef<UpdatePublicActivityComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IPublicActivityRead
  ) {
    this.publicActivityForm = this.fb.group({
      title: [
        data.title,
        [Validators.required],
      ],
      description: [
        data.description,
        [Validators.required],
      ],
      destinationId: [data.destinationId, [Validators.required]],
      imageURL: [data.imageURL, [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.GetAllDestinations();
  }

  SelectImage(event: any) {
    this.selectedFile = event.target.files[0];
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

  Update() {
    let formData = new FormData();

    formData.append('title', this.title?.value);
    formData.append('description', this.description?.value);
    formData.append('destinationID', this.destinationId?.value);
    formData.append('file', this.selectedFile);

    this.publicActivityService
      .UpdatePublicActivity(this.data.id, formData)
      .subscribe({
        next: (v) => {
          let response = v as IResponse;
          this.toastr.success(response.messages.toString());
          this.dialog.close(true);
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
  get imageURL() {
    return this.publicActivityForm.get('imageURL');
  }
}
