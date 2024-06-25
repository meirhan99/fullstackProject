import {
  AfterViewInit,
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { IResponse } from '../../models/iresponse';
import { IBranch } from '../../models/ibranch';
import { BranchService } from '../../services/branch/branch.service';
import { DestinationService } from '../../services/destination/destination.service';
import { IDestination } from '../../models/idestination';
import { IDestinationBranches } from '../../models/idestination-branches';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss'],
})
export class BranchComponent implements OnInit {
  response: IResponse = {} as IResponse;
  destinationBranches: IDestinationBranches[] = [];
  constructor(private branchService: BranchService) {}
  ngOnInit(): void {
    this.GetAllBranchesWithDestinationId();
  }

  GetAllBranchesWithDestinationId() {
    this.branchService.GetAllBranchesWithDestinationId().subscribe({
      next: (v) => {
        this.response = v as IResponse;
        this.destinationBranches = this.response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('branches'),
    });
  }
}
