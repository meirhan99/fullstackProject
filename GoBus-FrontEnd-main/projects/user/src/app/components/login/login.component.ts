import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IResponse } from '../../models/iresponse';
import { UserService } from '../../services/user/user.service';
import { ILogin } from '../../models/ilogin';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { MatDialog } from '@angular/material/dialog';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userLoginForm: FormGroup;
  response: IResponse = {} as IResponse;
  returnUrl: string = '';
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private toaster: ToastrService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    public dialog: MatDialog
  ) {
    this.returnUrl =
      this.activatedRoute.snapshot.queryParams['returnUrl'] || '/';
    this.userLoginForm = fb.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
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
      rememberMe: [false],
      role: ['User'],
    });
  }

  ngOnInit(): void {}

  submit() {
    let userLogin: ILogin = this.userLoginForm.value;
    this.userService.Login(userLogin).subscribe({
      next: (v) => {
        this.response = v as IResponse;
        let userToken = this.response.data.token;
        localStorage.setItem('token', userToken);
        this.toaster.success('success', 'Login Success');
        this.router.navigateByUrl(this.returnUrl);
        window.location.replace(this.returnUrl);
      },
      // error: (e) => {
      //   console.log(e)
      //   this.toaster.error('Email or password is not valid');
      // },
      // complete: () => console.log('complete'),
    });
  }

  forgetPass() {
    const dialogRef = this.dialog.open(ForgetPasswordComponent, {
      width: '750px',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
      }
    });
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

  get email() {
    return this.userLoginForm.get('email');
  }

  get password() {
    return this.userLoginForm.get('password');
  }
}
