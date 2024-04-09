import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CardService implements OnInit {
  cardLength: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  constructor(private httpClient: HttpClient) {
    this.getCard(localStorage.getItem('ID')).subscribe((data) => {
      this.cardLength.next(data.cardLength);
    });
  }
  ngOnInit(): void {
    // this.cardLength.subscribe((data) => (this.cardLengthNow = data));
  }
  addToCard(obj: any, id: any): Observable<any> {
    return this.httpClient.post<any>(
      `http://localhost:3000/api/users/${id}/card`,
      obj
    );
  }
  getCard(id: any): Observable<any> {
    return this.httpClient.get(`http://localhost:3000/api/users/${id}/card`);
  }
  deleteCard(id: any): Observable<any> {
    return this.httpClient.delete(`http://localhost:3000/api/users/${id}/card`);
  }
  updateCardLength() {
    this.getCard(localStorage.getItem('ID')).subscribe((data) => {
      this.cardLength.next(data.cardLength);
    });
  }
}
