import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserLoginAuthService {
  constructor(private httpClient: HttpClient) {}
  login(user: any): Observable<any> {
    return this.httpClient.post<any>(
      'http://localhost:3000/api/users/login',
      user
    );
  }
  logout() {
    localStorage.removeItem('userAccessToken');
    // this.isLogged(false).subscribe((status) => status);
    // this.isLoggedSubject.next(
    //   localStorage.getItem('userAccessToken') ? true : false
    // );
  }
  get isUserLogged(): boolean {
    return localStorage.getItem('userAccessToken') ? true : false;
  }
}
