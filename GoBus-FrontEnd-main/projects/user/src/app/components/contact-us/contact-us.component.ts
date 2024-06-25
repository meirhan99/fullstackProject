import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { IReport } from '../../models/ireport';
import { ReportService } from '../../services/report/report.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { IUser } from '../../models/iuser';
import { IResponse } from '../../models/iresponse';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss'],
})
export class ContactUsComponent implements OnInit {
  reportForm: FormGroup;
  user: IUser = {} as IUser;

  constructor(
    private fb: FormBuilder,
    private service: ReportService,
    private userService: UserService,
    private toaster: ToastrService,
    private router: Router,
    private spinner: NgxSpinnerService
  ) {
    this.reportForm = this.fb.group({
      firstName: [
        this.user.firstName,
        [Validators.required, Validators.pattern('[A-Za-z]{3,}')],
      ],
      lastName: [
        this.user.lastName,
        [Validators.required, Validators.pattern('[A-Za-z]{3,}')],
      ],
      email: [
        this.user.email,
        [
          Validators.required,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ],
      ],
      phoneNumber: [
        this.user.phoneNumber,
        [Validators.required, Validators.pattern('[0-9]{10}')],
      ],
      reservationNumber: [
        '',
        [Validators.required, Validators.pattern('[0-9]{1,6}')],
      ],
      messageTitle: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z0-9_ ]{3,}')],
      ],
      messageContent: [
        '',
        [Validators.required, Validators.pattern('[a-zA-Z0-9_ ]{3,}')],
      ],
    });
  }

  ngOnInit(): void {
    this.fillForm();
    this.firstName?.valid;
    this.lastName?.valid;
  }

  fillForm() {
    this.spinner.show();
    setTimeout(() => {
      this.userService.GetUser().subscribe({
        next: (v) => {
          this.spinner.hide();
          let response = v as IResponse;
          let user = response.data as IUser;
          this.reportForm.patchValue({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            phoneNumber: user.phoneNumber.slice(1),
          });
        },

        // error: (e) => {},
        // complete: () => console.log('complete'),
      });
    }, 300);
  }

  submit() {
    let report: IReport = this.reportForm.value;
    this.service.AddReport(report).subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.toaster.success('success', response.messages.toString());
        this.router.navigate(['/home']);
      },
      // error: (e) => {
      //   this.toaster.error('failed to send report');
      // },
      // complete: () => console.log('complete'),
    });
  }

  get firstName() {
    return this.reportForm.get('firstName');
  }
  get lastName() {
    return this.reportForm.get('lastName');
  }
  get email() {
    return this.reportForm.get('email');
  }
  get phoneNumber() {
    return this.reportForm.get('phoneNumber');
  }
  get reservationNumber() {
    return this.reportForm.get('reservationNumber');
  }
  get messageTitle() {
    return this.reportForm.get('messageTitle');
  }
  get messageContent() {
    return this.reportForm.get('messageContent');
  }
}
