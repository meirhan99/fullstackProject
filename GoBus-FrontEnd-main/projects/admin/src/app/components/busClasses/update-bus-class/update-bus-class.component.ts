import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusClassService } from '../../../services/busClass/bus-class.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IBusClassDetails } from '../../../models/busClass/ibus-class-details';
import { IResponse } from '../../../models/iresponse';

@Component({
  selector: 'app-update-bus-class',
  templateUrl: './update-bus-class.component.html',
  styleUrls: ['./update-bus-class.component.scss'],
})
export class UpdateBusClassComponent {
  busClassForm: FormGroup;
  selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private busClassService: BusClassService,
    private toastr: ToastrService,
    public dialog: MatDialogRef<UpdateBusClassComponent>,
    @Inject(MAT_DIALOG_DATA) public data: IBusClassDetails
  ) {
    this.busClassForm = this.fb.group({
      name: [data.name, [Validators.required]],
      averagePrice: [data.averagePrice, [Validators.required]],
      imageURL: [data.classImageURLs, [Validators.required]],
    });
  }
  ngOnInit(): void {}

  SelectImage(event: any) {
    this.selectedFile = event.target.files[0];
  }

  Update() {
    let formData = new FormData();

    formData.append('name', this.name?.value);
    formData.append('averagePrice', this.averagePrice?.value);
    formData.append('file', this.selectedFile);

    this.busClassService.UpdateBusClass(this.data.id, formData).subscribe({
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
    return this.busClassForm.get('name');
  }
  get averagePrice() {
    return this.busClassForm.get('averagePrice');
  }
  get imageURL() {
    return this.busClassForm.get('imageURL');
  }
}
