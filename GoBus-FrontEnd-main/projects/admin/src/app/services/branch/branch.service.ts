import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IBranchAdd } from '../../models/branch/ibranch-add';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(private http: HttpClient) {}

  GetAllStartBranches() {
    return this.http.get(`${environment.Api}/EndBranches`);
  }
  GetAllEndBranches() {
    return this.http.get(`${environment.Api}/EndBranches`);
  }

  AddBranch(branch: IBranchAdd) {
    return this.http.post(`${environment.Api}/StartBranches`, branch);
  }

  UpdateBranch(branchId: number, branch: IBranchAdd) {
    return this.http.put(
      `${environment.Api}/StartBranches/${branchId}`,
      branch
    );
  }
  DeleteBranch(id: number) {
    return this.http.delete(`${environment.Api}/StartBranches/${id}`);
  }

  GetBranchesByDestinationId(destinationId: number) {
    return this.http.get(
      `${environment.Api}/StartBranches/destinationId/${destinationId}`
    );
  }

  GetAllBranchesWithDestinationId() {
    return this.http.get(`${environment.Api}/Destinations/branches`);
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
