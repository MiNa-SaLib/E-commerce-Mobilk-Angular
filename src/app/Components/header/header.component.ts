import { AfterViewInit, Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardService } from 'src/app/Services/card.service';
import { UserLoginAuthService } from 'src/app/Services/user-login-auth.service';
import { UserRegistrationService } from 'src/app/Services/user-registration.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, AfterViewInit {
  isLogged: boolean = false;
  userName: string = '';
  // cardLength: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  cardLengthNow: any;
  constructor(
    private userAuth: UserRegistrationService,
    private card: CardService
  ) {}
  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.card.cardLength.subscribe((data) => (this.cardLengthNow = data));
    console.log(this.cardLengthNow);

    // this.card.getCard(localStorage.getItem('ID')).subscribe((data) => {
    //   this.cardLength.next(data.cardLength);
    // });
    // this.cardLength.subscribe((data) => (this.cardLengthNow = data));
    // this.isLogged = this.userAuth.isUserLogged;
    this.userAuth.isLoggedSubject.subscribe(
      (status) => (this.isLogged = status)
    );
    this.userAuth.userName.subscribe((name) => (this.userName = name));
    // this.userAuth.userAuth.subscribe((name) => (this.userName = name));
  }
  logout() {
    this.userAuth.logout();
    this.isLogged = this.userAuth.isUserLogged;
  }
  userNameFun() {
    this.userAuth.userNameFun();
  }
  get userID() {
    return localStorage.getItem('ID');
  }
}
