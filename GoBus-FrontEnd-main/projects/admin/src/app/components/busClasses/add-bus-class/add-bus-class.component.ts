import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BusClassService } from '../../../services/busClass/bus-class.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IResponse } from '../../../models/iresponse';

@Component({
  selector: 'app-add-bus-class',
  templateUrl: './add-bus-class.component.html',
  styleUrls: ['./add-bus-class.component.scss'],
})
export class AddBusClassComponent implements OnInit {
  busClassForm: FormGroup;
  selectedFile!: File;

  constructor(
    private fb: FormBuilder,
    private busClassService: BusClassService,
    private dialog: MatDialogRef<AddBusClassComponent>,
    private toastr: ToastrService
  ) {
    this.busClassForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern('[a-zA-z0-9_ ]{3,}')]],
      averagePrice: [
        '',
        [Validators.required, Validators.pattern('[a-zA-z0-9 -_ ]{3,}')],
      ],
    });
  }
  ngOnInit(): void {}

  SelectImage(event: any) {
    this.selectedFile = event.target.files[0];
  }

  Add() {
    let formData = new FormData();
    formData.append('name', this.name?.value);
    formData.append('averagePrice', this.averagePrice?.value);
    formData.append('file', this.selectedFile);

    this.busClassService.AddBusClass(formData).subscribe({
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
}
