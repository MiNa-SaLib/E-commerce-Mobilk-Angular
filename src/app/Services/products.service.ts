import {
  HttpClient,
  HttpClientModule,
  HttpHeaders,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, retry, take, throwError } from 'rxjs';
import { IProducts } from '../Models/iproducts';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  httpOptions;
  constructor(private HttpClientModule: HttpClient) {
    this.httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  getAllPrd(): Observable<any> {
    const url = `${environment.APIUrl}`;
    return this.HttpClientModule.get(url);
  }
  getRecommended(): Observable<any> {
    const url = `${environment.APIUrl}recommended`;
    return this.HttpClientModule.get(url);
  }

  getPrdByCatId(catID: number): Observable<IProducts[]> {
    return this.HttpClientModule.get<IProducts[]>(
      `${environment.APIUrl}products?categoryId=${catID}`
    );
  }
  getPrdById(Id: any): Observable<any> {
    return this.HttpClientModule.get(`${environment.APIUrl}${Id}`);
  }
  insertPrd(newPrd: IProducts): Observable<IProducts> {
    // return this.HttpClientModule.post<IProducts>(
    //   `${environment.APIUrl}products`,
    //   JSON.stringify(newPrd),
    //   this.httpOptions
    // );
    //post with handling errors
    return this.HttpClientModule.post<IProducts>(
      `${environment.APIUrl}products`,
      JSON.stringify(newPrd),
      this.httpOptions
    ).pipe(
      retry(2),
      catchError((error) => {
        console.log(error);
        return throwError(() => new Error('Post Error Ocurred'));
      })
    );
  }
  deletePrd(id: any): Observable<IProducts> {
    return this.HttpClientModule.delete<IProducts>(
      `${environment.APIUrl}products/${id}`
    );
  }
  editPrd(id: any, editedPRD: IProducts): Observable<IProducts> {
    return this.HttpClientModule.put<IProducts>(
      `${environment.APIUrl}products/${id}`,
      editedPRD
    );
  }
}
