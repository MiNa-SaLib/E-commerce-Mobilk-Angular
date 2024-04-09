import { Location } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { CardService } from 'src/app/Services/card.service';
import { UserLoginAuthService } from 'src/app/Services/user-login-auth.service';
import { UserRegistrationService } from 'src/app/Services/user-registration.service';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent implements OnInit, OnChanges {
  isLogged!: boolean;
  isNotFoundUser: boolean = false;

  notFoundUserError: string = '';
  user: string = '';
  userEmail: string = '';
  userPassword: string = '';
  constructor(
    private userRig: UserRegistrationService,
    private userAuth: UserLoginAuthService,
    private location: Location,
    private router: Router,
    private card: CardService
  ) {}
  ngOnChanges(): void {}
  login() {
    this.userAuth
      .login({ email: this.userEmail, password: this.userPassword })
      .subscribe(
        (user) => {
          console.log(user.message);
          if (user.status == 'success') {
            this.userRig.userName.next(user.data.firstName);
            let userAccessToken = user.data.token;
            localStorage.setItem('userAccessToken', userAccessToken);
            localStorage.setItem('ID', user.data._id);
            localStorage.setItem('userName', user.data.firstName);
            this.userRig.isLoggedSubject.next(
              localStorage.getItem('userAccessToken') ? true : false
            );
            this.card.cardLength.next(user.data.card.length);

            this.router.navigate(['home']);
          }
        },
        (error) => {
          if (this.userPassword && this.userEmail) {
            this.notFoundUserError = error.error.message;
            this.isNotFoundUser = true;
            console.log('oops', error.error.message);
          }
        }
      );
    //if i want the user to return into the component he was before he click login
    // this.location.back();
  }
  logout() {
    this.userRig.logout();
    this.isLogged = this.userRig.isUserLogged;
  }
  ngOnInit(): void {
    this.isLogged = this.userRig.isUserLogged;
  }
}
