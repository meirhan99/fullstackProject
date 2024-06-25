import { Component, OnInit } from '@angular/core';
import { PublicActivityService } from '../../services/publicActivity/public-activity.service';
import { ActivatedRoute } from '@angular/router';
import { IResponse } from '../../models/iresponse';
import { IPublicActivity } from '../../models/ipublic-activity';

@Component({
  selector: 'app-public-activity',
  templateUrl: './public-activity.component.html',
  styleUrls: ['./public-activity.component.scss'],
})
export class PublicActivityComponent implements OnInit {
  destinationId: number = 0;
  destinationName: any = '';
  publicActivities: IPublicActivity[] = [];
  response: IResponse = {} as IResponse;
  constructor(
    private service: PublicActivityService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.destinationId = Number(
      this.activatedRoute.snapshot.paramMap.get('id')
    );
    this.GetAllPublicActivitiesByDestinationId(this.destinationId);
  }

  GetAllPublicActivitiesByDestinationId(id: number) {
    this.service.GetAllPublicActivitiesByDestinationId(id).subscribe({
      next: (v) => {
        this.response = v as IResponse;
        this.publicActivities = this.response.data;
        this.destinationName = this.publicActivities[0]?.destinationName;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }
}
