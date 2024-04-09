import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { ICategory } from 'src/app/Models/icategory';
import { IProducts } from 'src/app/Models/iproducts';
import { CartVm } from 'src/app/ViewModels/cart-vm';
import { ProductListComponent } from '../product-list/product-list.component';

@Component({
  selector: 'app-order-master',
  templateUrl: './order-master.component.html',
  styleUrls: ['./order-master.component.css'],
})
export class OrderMasterComponent implements OnInit, AfterViewInit {
  catList: ICategory[];
  selected: number = 0;
  totalPrice: number = 0;
  orderDetails: CartVm[] = [];
  @ViewChild(ProductListComponent) productObj!: ProductListComponent;
  constructor() {
    this.catList = [
      { id: 1, name: 'Laptops' },
      { id: 2, name: 'Tablets' },
      { id: 3, name: 'Mobiles' },
    ];
  }
  ngAfterViewInit(): void {
    // this.confirm();
  }

  ngOnInit(): void {}
  getPrice(details: CartVm[]) {
    this.orderDetails = details;
    for (let i of this.orderDetails) {
      i.total = i.count * i.price;
    }

    this.totalPrice += this.orderDetails[this.orderDetails.length - 1].total;
  }
  plus(count: number, productName: string) {
    for (let i of this.orderDetails) {
      if (i.productName == productName && i.count < i.availableQuantity) {
        i.count = +i.count + 1;
        i.total = i.count * i.price;
        this.totalPrice += i.price;
      }
    }
  }
  minus(count: number, productName: string) {
    for (let i of this.orderDetails) {
      if (i.productName == productName && i.count > 1) {
        i.count = +i.count - 1;
        i.total = i.count * i.price;
        this.totalPrice -= i.price;
      }
    }
  }
  remove(index: number) {
    for (let i = 0; i < this.orderDetails.length; i++) {
      if (i == index) {
        this.totalPrice -= this.orderDetails[i].total;
        this.orderDetails.splice(index, 1);
      }
    }
  }
  // confirm(){
  //   for (let i = 0; i < this.orderDetails.length; i++) {
  //     for (let j = 0; j < this.productObj.productList.length; j++) {
  //       if (this.orderDetails[i].productName==this.productObj.productList[j].name) {
  //         this.productObj.productList[j].avQuantity-=this.orderDetails[i].count;

  //       }

  //     }

  //   }

  // }
}
