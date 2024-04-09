import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CardService } from 'src/app/Services/card.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent implements OnInit {
  cardDetails: any;
  productsTotal: number = 0;
  initialTotal: number[] = [];
  confirmed: boolean = false;
  constructor(private card: CardService, private router: Router) {}

  ngOnInit(): void {
    this.card.getCard(localStorage.getItem('ID')).subscribe((data) => {
      console.log(data.data);
      this.cardDetails = data.data;
      for (let index = 0; index < this.cardDetails.length; index++) {
        this.initialTotal.push(this.cardDetails[index].price);
      }
      this.productsTotal = this.initialTotal.reduce((p, c) => {
        return p + c;
      });
      console.log(this.productsTotal);
    });
  }
  plus(counter: any, id: any, total: any) {
    // console.log(counter.innerHTML);
    const targetProduct = this.cardDetails.find(
      (product: any) => product._id == id
    );
    if (
      +counter.innerHTML < +targetProduct.availableQuantity &&
      +counter.innerHTML > 0
    ) {
      counter.innerHTML = +counter.innerHTML + 1;
      total.innerHTML = +targetProduct.price * +counter.innerHTML;
      this.productsTotal = this.productsTotal + +targetProduct.price;
    }
  }
  minus(counter: any, id: any, total: any) {
    const targetProduct = this.cardDetails.find(
      (product: any) => product._id == id
    );
    if (
      +counter.innerHTML <= +targetProduct.availableQuantity &&
      +counter.innerHTML > 1
    ) {
      counter.innerHTML = +counter.innerHTML - 1;
      total.innerHTML = +targetProduct.price * +counter.innerHTML;
      this.productsTotal = this.productsTotal - +targetProduct.price;
    }
  }
  confirmOrder() {
    this.card.deleteCard(localStorage.getItem('ID')).subscribe((data) => {
      console.log('done');
    });
    this.confirmed = true;
    this.card.cardLength.next(0);
    setTimeout(() => {
      this.router.navigate(['home']);
      this.confirmed = false;
    }, 3000);
  }
}
