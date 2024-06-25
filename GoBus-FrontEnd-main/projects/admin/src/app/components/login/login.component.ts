import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IResponse } from '../../models/iresponse';
import { AdminService } from '../../services/admin/admin.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ILogin } from '../../models/login/ilogin';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  adminLoginForm: FormGroup;
  response: IResponse = {} as IResponse;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private toaster: ToastrService,
    private router: Router
  ) {
    this.adminLoginForm = fb.group({
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
      role: ['Admin'],
    });
  }

  ngOnInit(): void {}
  submit() {
    let adminLogin: ILogin = this.adminLoginForm.value;
    this.adminService.Login(adminLogin).subscribe({
      next: (v) => {
        this.response = v as IResponse;
        let userToken = this.response.data.token;
        localStorage.setItem('token', userToken);
        this.toaster.success('success', 'Login Success');
        window.location.replace('users');
        this.router.navigate(['/users']);
      },
      // error: (e) => {
      //   console.log(e)
      //   this.toaster.error('Email or password is not valid');
      // },
      // complete: () => console.log('complete'),
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
    return this.adminLoginForm.get('email');
  }

  get password() {
    return this.adminLoginForm.get('password');
  }
}
