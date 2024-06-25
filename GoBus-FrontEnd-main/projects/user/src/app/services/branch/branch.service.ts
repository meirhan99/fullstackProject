import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private http: HttpClient) {}

  GetAllBranchesWithDestinationId() {
    return this.http.get(`${environment.Api}/Destinations/branches`);
  }

  GetAllBranchesByDestinationId(destinationId: number) {
    return this.http.get(
      `${environment.Api}/StartBranches/destinationId/${destinationId}`
    );
  }

  GetAllStartBranches() {
    return this.http.get(`${environment.Api}/StartBranches`);
  }

  GetAllEndBranches() {
    return this.http.get(`${environment.Api}/EndBranches`);
  }

  FilterStartBranchesByEndBranchDestinationIdAsync(
    endBranchDestinationId: number
  ) {
    return this.http.get(
      `${environment.Api}/StartBranches/filter/destinationId/${endBranchDestinationId}`
    );
  }

  FilterEndBranchesByStartBranchDestinationIdAsync(
    startBranchDestinationId: number
  ) {
    return this.http.get(
      `${environment.Api}/EndBranches/filter/destinationId/${startBranchDestinationId}`
    );
  }

  GetEndBranchById(id: number) {
    return this.http.get(`${environment.Api}/EndBranches/${id}`);
  }

  GetStartBranchById(id: number) {
    return this.http.get(`${environment.Api}/StartBranches/${id}`);
  }
}
