import { Component, OnInit } from '@angular/core';
import { IResponse } from '../../models/iresponse';
import { TripService } from '../../services/trip/trip.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ITrip } from '../../models/itrip';
import { IFilterTrip } from '../../models/ifilter-trip';
import { IBranch } from '../../models/ibranch';
import { BranchService } from '../../services/branch/branch.service';

@Component({
  selector: 'app-choose-trip',
  templateUrl: './choose-trip.component.html',
  styleUrls: ['./choose-trip.component.scss'],
})
export class ChooseTripComponent implements OnInit {
  trips: ITrip[] = [];
  filterTrip: IFilterTrip = {} as IFilterTrip;
  startBranch: IBranch = {} as IBranch;
  endBranch: IBranch = {} as IBranch;

  constructor(
    private service: TripService,
    private activatedRoute: ActivatedRoute,
    private branchService: BranchService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.filterTrip.departureDate = paramMap.get('departureDate');
    });

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.filterTrip.startBranchId = Number(paramMap.get('startBranchId'));
    });

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.filterTrip.endBranchId = Number(paramMap.get('endBranchId'));
    });

    this.activatedRoute.paramMap.subscribe((paramMap) => {
      this.filterTrip.quantity = Number(paramMap.get('quantity'));
    });

    this.router.events.subscribe((event) => {
      this.FilterTrips(this.filterTrip);
    });

    this.FilterTrips(this.filterTrip);
    this.GetStartBranchById(this.filterTrip.startBranchId);
    this.GetEndBranchById(this.filterTrip.endBranchId);
  }

  FilterTrips(filterTrip: IFilterTrip) {
    this.service.FilterTrips(filterTrip).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.trips = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  ChooseTrip(tripId: number) {
    this.router.navigate(['/reservation/', tripId, this.filterTrip.quantity]);
  }

  GetStartBranchById(id: number) {
    this.branchService.GetStartBranchById(id).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.startBranch = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  GetEndBranchById(id: number) {
    this.branchService.GetEndBranchById(id).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.endBranch = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }
}
