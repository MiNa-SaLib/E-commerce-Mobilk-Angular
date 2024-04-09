import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { CardService } from './card.service';

@Injectable({
  providedIn: 'root',
})
export class UserRegistrationService {
  isLoggedSubject: BehaviorSubject<boolean>;
  userName: BehaviorSubject<string>;
  constructor(private httpClient: HttpClient, private card: CardService) {
    this.isLoggedSubject = new BehaviorSubject<boolean>(
      localStorage.getItem('userAccessToken') ? true : false
    );
    this.userName = new BehaviorSubject<string>(
      localStorage.getItem('userName')!
    );
  }
  register(newUser: any): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:3000/api/users/register',
      newUser
    );
  }
  getAllUsersData(): Observable<any> {
    return this.httpClient.get<any>('http://localhost:3000/api/users');
  }
  //to store user data in local storage
  userAuth(user: any) {
    this.userName.next(user.firstName);

    let userAccessToken = user.token;
    localStorage.setItem('userAccessToken', userAccessToken);

    this.userName.subscribe((username) => {
      localStorage.setItem('userName', username);
    });
    // this.isLogged(true).subscribe((status) => status);
    this.isLoggedSubject.next(
      localStorage.getItem('userAccessToken') ? true : false
    );
  }

  logout() {
    localStorage.removeItem('userAccessToken');
    localStorage.removeItem('userName');
    localStorage.removeItem('ID');
    this.card.cardLength.next(0);
    // this.isLogged(false).subscribe((status) => status);
    this.isLoggedSubject.next(
      localStorage.getItem('userAccessToken') ? true : false
    );
    this.userName.next('');
  }
  get isUserLogged(): boolean {
    return localStorage.getItem('userAccessToken') ? true : false;
  }
  userNameFun() {
    this.userName.next(localStorage.getItem('userName')!);
    this.userName.subscribe((n) => console.log(n));
  }
}
