import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class PublicActivityService {
  constructor(private http: HttpClient) {}

  GetAllPublicActivitiesByDestinationId(id: number) {
    return this.http.get(`${environment.Api}/PublicActivities/destinationId/${id}`);
  }

}
