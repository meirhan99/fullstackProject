import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from '../../services/branch/branch.service';
import { IResponse } from '../../models/iresponse';
import { IBranch } from '../../models/ibranch';
import { DatePipe } from '@angular/common';
import { IFilterTrip } from '../../models/ifilter-trip';
import { TripService } from '../../services/trip/trip.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  constructor() {}
}
