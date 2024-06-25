import { Component, OnInit } from '@angular/core';
import { DestinationService } from '../../services/destination/destination.service';
import { Router } from '@angular/router';
import { IDestination } from '../../models/idestination';
import { IResponse } from '../../models/iresponse';

@Component({
  selector: 'app-destination',
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
})
export class DestinationComponent implements OnInit {
  destinations: IDestination[] = [];
  response: IResponse = {} as IResponse;

  constructor(private service: DestinationService, private router: Router) {}

  ngOnInit(): void {
    this.getAllDestinations();
  }

  getAllDestinations() {
    this.service.GetAllDestinations().subscribe({
      next: (v) => {
        this.response = v as IResponse;
        this.destinations = this.response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  ShowDestinationDetails(id: number) {
    this.router.navigate(['/destinations/', id]);
  }
}
