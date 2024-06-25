import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IBusRead } from '../../../models/bus/ibus-read';
import { TripService } from '../../../services/trip/trip.service';
import { BranchService } from '../../../services/branch/branch.service';
import { BusService } from '../../../services/bus/bus.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { ITripAdd } from '../../../models/trip/itrip-add';
import { IBranchRead } from '../../../models/branch/ibranch-read';
import { IResponse } from '../../../models/iresponse';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss'],
})
export class AddTripComponent implements OnInit {
  tripForm: FormGroup;
  buses: IBusRead[] = [];

  startBranches: IBranchRead[] = [];
  endBranches: IBranchRead[] = [];

  startBranchesIds: number[] = [];
  endBranchesIds: number[] = [];

  branchChanged: boolean = false;
  today: string | null = '';

  constructor(
    private fb: FormBuilder,
    private tripService: TripService,
    private branchService: BranchService,
    private busService: BusService,
    private dialog: MatDialogRef<AddTripComponent>,
    private toastr: ToastrService,
    private dPipe: DatePipe
  ) {
    this.today = dPipe.transform(new Date(), 'yyyy-MM-dd hh:mm');

    this.tripForm = this.fb.group({
      startBranchId: [1, [Validators.required]],
      endBranchId: [14, [Validators.required]],
      departureDate: [this.today, [Validators.required]],
      arrivalDate: [this.today, [Validators.required]],
      price: ['', [Validators.required]],
      busId: ['', [Validators.required]],
    });
  }
  ngOnInit(): void {
    this.GetAllStartBranches();
    this.GetAllEndBranches();
  }
  Add() {
    let trip: ITripAdd = this.tripForm.value;

    this.tripService.Addtrip(trip).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.toastr.success(response.messages.toString());
        this.dialog.close(true);
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  DateChanged() {
    this.GetAllAvailableBuses(
      this.departureDate?.value,
      this.arrivalDate?.value
    );
    console.log(this.departureDate?.value)
    console.log(this.arrivalDate?.value)
  }
  GetAllAvailableBuses(departureDate: Date, arrivalDate: Date) {
    this.busService.GetAllAvailableBuses(departureDate, arrivalDate).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.buses = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  changeStartBranch(selectStartBranch: any) {
    this.branchChanged = true;
    let branch = this.startBranches.find(
      (x) => x.id == selectStartBranch.value
    ) as IBranchRead;
    this.branchService
      .GetBranchesByDestinationId(branch.destinationId)
      .subscribe({
        next: (v) => {
          let response = v as IResponse;
          let startBranches: IBranchRead[] = response.data;
          this.startBranchesIds = startBranches.map((x) => x.id);
        },
        // error: (e) => console.log(e),
        // complete: () => console.log('complete'),
      });
  }

  changeEndBranch(selectEndBranch: any) {
    this.branchChanged = true;
    let branch = this.endBranches.find(
      (x) => x.id == selectEndBranch.value
    ) as IBranchRead;
    this.branchService
      .GetBranchesByDestinationId(branch.destinationId)
      .subscribe({
        next: (v) => {
          let response = v as IResponse;
          let endBranches: IBranchRead[] = response.data;
          this.endBranchesIds = endBranches.map((x) => x.id);
        },
        // error: (e) => console.log(e),
        // complete: () => console.log('complete'),
      });
  }

  GetAllStartBranches() {
    this.branchService.GetAllStartBranches().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.startBranches = response.data;
      },
      // error: (e) => console.log(e),
      //complete: () => console.log('startBranches'),
    });
  }

  GetAllEndBranches() {
    this.branchService.GetAllEndBranches().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.endBranches = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('EndBranches'),
    });
  }

  get startBranchId() {
    return this.tripForm.get('startBranchId');
  }
  get endBranchId() {
    return this.tripForm.get('endBranchId');
  }
  get departureDate() {
    return this.tripForm.get('departureDate');
  }
  get arrivalDate() {
    return this.tripForm.get('arrivalDate');
  }
  get price() {
    return this.tripForm.get('price');
  }
  get busId() {
    return this.tripForm.get('busId');
  }
}
