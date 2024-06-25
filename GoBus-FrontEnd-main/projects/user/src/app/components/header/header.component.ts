import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { IResponse } from '../../models/iresponse';
import { IUser } from '../../models/iuser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: IUser = {} as IUser;

  constructor(
    private router: Router,
    private userService: UserService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._activatedRoute.paramMap.subscribe((params) => {
      this.ngOnInit();
    });
  }

  ngOnInit(): void {
    this.GetUser();
  }

  GetUser() {
    this.userService.GetUser().subscribe({
      next: (v) => {
        let response = v as IResponse;
        this.user = response.data as IUser;
      },
      // error: (e) => {},
      // complete: () => console.log('complete'),
    });
  }

  LogOut() {
    this.router.navigate(['/login']);
    this.user = {} as IUser;
    localStorage.removeItem('token');
  }

  get isUserLogged(): boolean {
    return localStorage.getItem('token') ? true : false;
  }
}
