import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IPublicActivityRead } from '../../models/publicActivity/ipublic-activity-read';
import { IPublicActivityAdd } from '../../models/publicActivity/ipublic-activity-add';

@Injectable({
  providedIn: 'root',
})
export class PublicActivityService {
  constructor(private http: HttpClient) {}

  GetAllPublicActivities() {
    return this.http.get(`${environment.Api}/PublicActivities`);
  }
  AddPublicActivity(PublicActivity: any) {
    return this.http.post(
      `${environment.Api}/PublicActivities`,
      PublicActivity
    );
  }
  UpdatePublicActivity(publicActivityId: number, PublicActivity: any) {
    return this.http.put(
      `${environment.Api}/PublicActivities/${publicActivityId}`,
      PublicActivity
    );
  }
  DeletePublicActivity(id: number) {
    return this.http.delete(`${environment.Api}/PublicActivities/${id}`);
  }
  GetPublicActivitiesByDestinationId(destinationId: number) {
    return this.http.get(
      `${environment.Api}/PublicActivities/destinationId/${destinationId}`
    );
  }
}
