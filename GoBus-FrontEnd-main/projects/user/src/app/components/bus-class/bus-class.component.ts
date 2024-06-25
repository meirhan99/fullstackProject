import { Component, OnInit } from '@angular/core';
import { BusClassService } from '../../services/busClass/bus-class.service';
import { IResponse } from '../../models/iresponse';
import { IBusClass } from '../../models/ibus-class';

@Component({
  selector: 'app-bus-class',
  templateUrl: './bus-class.component.html',
  styleUrls: ['./bus-class.component.scss'],
})
export class BusClassComponent implements OnInit {
  response: IResponse = {} as IResponse;
  busClasses: IBusClass[] = [];

  constructor(private busClassService: BusClassService) {}
  ngOnInit(): void {
    this.GetAllBusClasses()
  }

  GetAllBusClasses() {
    this.busClassService.GetAllBusClasses().subscribe({
      next: (v) => {
        this.response = v as IResponse;
        this.busClasses = this.response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('branches'),
    });
  }
}
