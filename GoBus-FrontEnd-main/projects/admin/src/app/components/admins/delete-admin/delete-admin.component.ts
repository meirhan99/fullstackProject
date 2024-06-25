import { Component, OnInit ,Inject} from '@angular/core';
import { AdminService } from '../../../services/admin/admin.service';
import { ToastrService } from 'ngx-toastr';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IResponse } from '../../../models/iresponse';

@Component({
  selector: 'app-delete-admin',
  templateUrl: './delete-admin.component.html',
  styleUrls: ['./delete-admin.component.scss']
})

export class DeleteAdminComponent implements OnInit {
  constructor(
    private adminService: AdminService,
    private toastr: ToastrService,
    public dialog: MatDialogRef<DeleteAdminComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}
  ngOnInit(): void {}
  Delete() {
    this.adminService.DeleteAdmin(this.data).subscribe({
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
