import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { IResponse } from '../../models/iresponse';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { IUser } from '../../models/iuser';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  userRegisterForm: FormGroup;
  response: IResponse = {} as IResponse;
  userNames: string[] = [];
  userEmails: string[] = [];
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.userRegisterForm = fb.group(
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

  submit() {
    let userRegister: IUser = this.userRegisterForm.value;

    this.userService.Register(userRegister).subscribe({
      next: (v) => {
        this.response = v as IResponse;
        this.toaster.success('success', 'Register Success');
        this.router.navigate(['/login']);
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
    this.userService.GetAllUserNames().subscribe({
      next: (v) => {
        this.response = v as IResponse;
        this.userNames = this.response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  GetAllEmails() {
    this.userService.GetAllEmails().subscribe({
      next: (v) => {
        this.response = v as IResponse;
        this.userEmails = this.response.data;
      },
      // error: (e) => console.log(e),
      // complete: () => console.log('complete'),
    });
  }

  get firstName() {
    return this.userRegisterForm.get('firstName');
  }
  get lastName() {
    return this.userRegisterForm.get('lastName');
  }
  get userName() {
    return this.userRegisterForm.get('userName');
  }
  get email() {
    return this.userRegisterForm.get('email');
  }
  get phoneNumber() {
    return this.userRegisterForm.get('phoneNumber');
  }

  get password() {
    return this.userRegisterForm.get('password');
  }

  get confirmPassword() {
    return this.userRegisterForm.get('confirmPassword');
  }
}
