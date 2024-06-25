import { Component, OnInit ,Inject} from '@angular/core';
import { BranchService } from '../../../services/branch/branch.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';

@Component({
  selector: 'app-delete-branch',
  templateUrl: './delete-branch.component.html',
  styleUrls: ['./delete-branch.component.scss']
})

export class DeleteBranchComponent implements OnInit {
  constructor(
    private branchService: BranchService,
    private toastr: ToastrService,
    public dialog: MatDialogRef<DeleteBranchComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}
  Delete() {
    this.branchService.DeleteBranch(this.data).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.toastr.success(response.messages.toString());
        this.dialog.close(true);
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }
}
