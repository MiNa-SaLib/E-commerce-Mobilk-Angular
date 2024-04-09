import { Injectable, OnDestroy } from '@angular/core';
import { Observable, observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PromotionAdsService {
  addsList: string[];

  constructor() {
    this.addsList = ['add1', 'add2', 'add3', 'add4', 'add5', ''];
  }
  getAdds(timeInterval: number): Observable<string> {
    return new Observable((observer) => {
      let counter = 0;
      let interval = setInterval(() => {
        if (this.addsList[counter] == '') {
          observer.error('error');
        }
        if (this.addsList.length == counter) {
          observer.complete();
        }
        observer.next(this.addsList[counter]);
        counter++;
      }, timeInterval * 1000);
      return {
        unsubscribe() {
          clearInterval(interval);
          console.log('in unsubscribe');
        },
      };
    });
  }
}
