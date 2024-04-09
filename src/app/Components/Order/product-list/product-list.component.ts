import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { IProducts } from 'src/app/Models/iproducts';
import { ProductsService } from 'src/app/Services/products.service';
import { StaticProductsService } from 'src/app/Services/static-products.service';
import { CartVm } from 'src/app/ViewModels/cart-vm';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit, OnChanges, AfterViewInit {
  @Output() onTotalPriceChanged: EventEmitter<CartVm[]>;
  totalPrice: number = 0;
  @Input() sentSelected: number = 0;
  NewProductList: any;
  cat: {}[] = [];
  arr: CartVm[] = [];
  @ViewChild('count') userCount!: ElementRef;
  constructor(private PrdService: ProductsService, private router: Router) {
    this.onTotalPriceChanged = new EventEmitter<CartVm[]>();
  }

  ngAfterViewInit(): void {}

  ngOnInit(): void {
    this.PrdService.getAllPrd().subscribe((prd) => {
      this.NewProductList = prd.data.products;
    });
  }
  addNewPrd() {
    this.router.navigate(['prds/add']);
  }
  ngOnChanges(): void {
    this.PrdService.getPrdByCatId(this.sentSelected).subscribe(
      (prd) => (this.NewProductList = prd)
    );
  }
  showPrdDetails(prdID: number) {
    this.router.navigate(['prd', prdID]);
  }

  buy(id: number, price: number, count: any) {
    for (let item of this.NewProductList) {
      if (
        item.id == id &&
        item.quantity > 0 &&
        item.quantity >= +count &&
        count > 0
      ) {
        //we shouldn't change quantity here,
        //user must confirm his order then we use user's data order to update our av.quantity
        // item.quantity = item.quantity - +count;
        // this.totalPrice += price * +count;
        //Execute event
        this.arr.push({
          productName: item.name,
          count: count,
          price: price,
          availableQuantity: item.quantity,
          total: 0,
        });
        console.log(this.arr);
        this.onTotalPriceChanged.emit(this.arr);
      }
    }
  }
}
