import { Injectable } from '@angular/core';
import { IProducts } from '../Models/iproducts';

@Injectable({
  providedIn: 'root',
})
export class StaticProductsService {
  private productList: IProducts[];
  constructor() {
    this.productList = [
      {
        id: 100,
        name: 'Dell precision5310 laptop',
        price: 11000,
        quantity: 10,
        avQuantity: 10,
        imgUrl: 'assets/logo.jpg',
        categoryId: 1,
      },
      {
        id: 200,
        name: 'Dell Latitude6540 laptop',
        price: 12000,
        quantity: 0,
        avQuantity: 0,
        imgUrl: 'assets/logo.jpg',
        categoryId: 1,
      },
      {
        id: 300,
        name: 'Samsung Tablet',
        price: 13000,
        quantity: 12,
        avQuantity: 12,
        imgUrl: 'assets/logo.jpg',
        categoryId: 2,
      },
      {
        id: 400,
        name: 'lenovo tablet',
        price: 14000,
        quantity: 2,
        avQuantity: 2,
        imgUrl: 'assets/logo.jpg',
        categoryId: 2,
      },
      {
        id: 500,
        name: 'samsung note10',
        price: 15000,
        quantity: 0,
        avQuantity: 0,
        imgUrl: 'assets/logo.jpg',
        categoryId: 3,
      },
      {
        id: 600,
        name: 'samsung s22 ultra',
        price: 15000,
        quantity: 1,
        avQuantity: 1,
        imgUrl: 'assets/logo.jpg',
        categoryId: 3,
      },
      {
        id: 700,
        name: 'Nokia',
        price: 1000,
        quantity: 21,
        avQuantity: 21,
        imgUrl: 'assets/logo.jpg',
        categoryId: 3,
      },
    ];
  }
  getAllPrd(): IProducts[] {
    return this.productList;
  }
  getPrdByCatId(catId: number): IProducts[] {
    if (catId == 0) return this.productList;
    else return this.productList.filter((prd) => prd.categoryId == catId);
  }
  getPrdById(Id: number): IProducts | null {
    let found = this.productList.find((prd) => prd.id == Id);
    // return found?found:null;//ternary
    if (found) {
      return found;
    } else {
      return null;
    }
  }
  getPrdIDs(): number[] {
    let arr = this.productList.map((ele) => ele.id);
    return arr;
  }
}
