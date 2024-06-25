import { Component, OnInit } from '@angular/core';
import { IBranchRead } from '../../../models/branch/ibranch-read';
import { BranchService } from '../../../services/branch/branch.service';
import { IResponse } from '../../../models/iresponse';
import { AddBranchComponent } from '../add-branch/add-branch.component';
import { MatDialog } from '@angular/material/dialog';
import { UpdateBranchComponent } from '../update-branch/update-branch.component';
import { BranchDetailsComponent } from '../branch-details/branch-details.component';
import { DeleteBranchComponent } from '../delete-branch/delete-branch.component';
import { DestinationService } from '../../../services/destination/destination.service';
import { IDestinationRead } from '../../../models/destination/idestination-read';

@Component({
  selector: 'app-all-branches',
  templateUrl: './all-branches.component.html',
  styleUrls: ['./all-branches.component.scss'],
})
export class AllBranchesComponent implements OnInit {
  branches: IBranchRead[] = [];
  destinations: IDestinationRead[] = [];

  constructor(
    private branchService: BranchService,
    private destinationService: DestinationService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.GetAllBranches();
    this.GetAllDestinations();
  }

  FilterBranches(destinationId: any) {
    if (destinationId.value == 0) {
      this.GetAllBranches();
    } else {
      this.GetBranchesByDestinationId(destinationId.value);
    }
  }

  GetBranchesByDestinationId(destinationId: number) {
    this.branchService.GetBranchesByDestinationId(destinationId).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.branches = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }
  GetAllBranches() {
    this.branchService.GetAllStartBranches().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.branches = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }
  GetAllDestinations() {
    this.destinationService.GetAllDestinations().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.destinations = response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  AddBranch() {
    const dialogRef = this.dialog.open(AddBranchComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllBranches();
      }
    });
  }

  UpdateBranch(branch: IBranchRead) {
    const dialogRef = this.dialog.open(UpdateBranchComponent, {
      width: '750px',
      data: branch,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllBranches();
      }
    });
  }

  BranchDetails(branch: IBranchRead) {
    const dialogRef = this.dialog.open(BranchDetailsComponent, {
      width: '750px',
      data: branch,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllBranches();
      }
    });
  }

  DeleteBranch(branchId: number) {
    const dialogRef = this.dialog.open(DeleteBranchComponent, {
      width: '750px',
      data: branchId,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.GetAllBranches();
      }
    });
  }
}
