import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { IResponse } from '../../../models/iresponse';
import { AdminService } from '../../../services/admin/admin.service';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { IUserRead } from '../../../models/user/iuser-read';

@Component({
  selector: 'app-add-admin',
  templateUrl: './add-admin.component.html',
  styleUrls: ['./add-admin.component.scss']
})

export class AddAdminComponent implements OnInit {
  adminRegisterForm: FormGroup;
  response: IResponse = {} as IResponse;
  userNames: string[] = [];
  userEmails: string[] = [];
  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private dialog: MatDialogRef<AddAdminComponent>,

    private toaster: ToastrService,
  ) {
    this.adminRegisterForm = fb.group(
      {
        firstName: [
          '',
          [Validators.required, Validators.pattern('[A-Za-z]{3,}')],
        ],
        lastName: [
          '',
          [Validators.required, Validators.pattern('[A-Za-z]{3,}')],
        ],
        userName: [
          '',
          [
            Validators.required,
            Validators.pattern('[A-Za-z0-9]{3,}'),
            this.existUserNameValidator(),
          ],
        ],
        email: [
          '',
          [
            Validators.required,
            Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
            this.existEmailValidator(),
          ],
        ],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(
              '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$'
            ),
          ],
        ],
        confirmPassword: ['', [Validators.required]],
        phoneNumber: [
          '',
          [Validators.required, Validators.pattern('[0-9]{11}')],
        ],
      },

      { validators: this.passwordMatchValidator }
    );
  }

  ngOnInit(): void {
    this.GetAllUserNames();
    this.GetAllEmails();
  }

  Add() {
    let adminRegister: IUserRead = this.adminRegisterForm.value;

    this.adminService.RegisterAdmin(adminRegister).subscribe({
      next: (v) => {
        this.response = v as IResponse;
        this.toaster.success('success', 'Register Success');
        this.dialog.close(true);
      },
      // error: (e) => {
      //   this.toaster.error('Register failed');
      // },
      // complete: () => console.log('complete'),
    });
  }

  existEmailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let emailVal: string = control.value;

      if (emailVal.length == 0 && control.untouched) {
        return null;
      }
      let validationError = { existEmail: true };
      let foundEmail = this.userEmails.includes(emailVal);
      return foundEmail ? validationError : null;
    };
  }

  existUserNameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      let userNameVal: string = control.value;

      if (userNameVal.length == 0 && control.untouched) {
        return null;
      }
      let validationError = { existUserName: true };
      let foundEmail = this.userNames.includes(userNameVal);
      return foundEmail ? validationError : null;
    };
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;

    if (password !== confirmPassword) {
      form.get('confirmPassword')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmPassword')?.setErrors(null);
    }
  }

  GetAllUserNames() {
    this.adminService.GetAllUserNames().subscribe({
      next: (v) => {
        this.response = v as IResponse;
        this.userNames = this.response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  GetAllEmails() {
    this.adminService.GetAllEmails().subscribe({
      next: (v) => {
        this.response = v as IResponse;
        this.userEmails = this.response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  get firstName() {
    return this.adminRegisterForm.get('firstName');
  }
  get lastName() {
    return this.adminRegisterForm.get('lastName');
  }
  get userName() {
    return this.adminRegisterForm.get('userName');
  }
  get email() {
    return this.adminRegisterForm.get('email');
  }
  get phoneNumber() {
    return this.adminRegisterForm.get('phoneNumber');
  }

  get password() {
    return this.adminRegisterForm.get('password');
  }

  get confirmPassword() {
    return this.adminRegisterForm.get('confirmPassword');
  }
}
