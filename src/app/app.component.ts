import { Component, ComponentFactory, OnInit } from '@angular/core';
import { UserRegistrationService } from './Services/user-registration.service';
import { CardService } from './Services/card.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title: string = 'Mobilik';
  isLogged!: boolean;
  userName: any;
  constructor(
    private userAuth: UserRegistrationService,
    private card: CardService
  ) {
    this.userAuth.isLoggedSubject.subscribe(
      (status) => (this.isLogged = status)
    );
    console.log(this.isLogged);
    this.userAuth.userNameFun();
    userAuth.userName.subscribe(
      (name) => (this.userName = name || localStorage.getItem('userName'))
    );
  }
  ngOnInit(): void {}

  logout() {
    this.userAuth.logout();
    // this.isLogged = this.userAuth.isUserLogged;
  }
}
