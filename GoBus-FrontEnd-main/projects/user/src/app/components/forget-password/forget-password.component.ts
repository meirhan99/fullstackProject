import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export class ForgetPasswordComponent {
  forgetPassForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toaster: ToastrService,
    private router: Router,
    private dialog: MatDialogRef<ForgetPasswordComponent>
  ) {
    this.forgetPassForm = fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
    });
  }

  submit() {
    let forgetPass = this.forgetPassForm.value;
    console.log(forgetPass);
    this.dialog.close(true);
    this.toaster.success('success', 'Please check your email');
  }

  get email() {
    return this.forgetPassForm.get('email');
  }
}
