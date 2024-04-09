import { Location } from '@angular/common';
import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IProducts } from 'src/app/Models/iproducts';
import { CardService } from 'src/app/Services/card.service';
import { ProductsService } from 'src/app/Services/products.service';
import { StaticProductsService } from 'src/app/Services/static-products.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css'],
})
export class ProductDetailsComponent implements OnInit, OnChanges {
  currentPrdId: any;
  prdIDs: number[] = [];
  prdDetails: any;
  flag: boolean = false;
  userAccessToken: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private product: ProductsService,
    private router: Router,
    private location: Location,
    private card: CardService
  ) {}

  ngOnChanges(): void {
    this.userAccessToken = localStorage.getItem('userAccessToken');
  }

  ngOnInit(): void {
    setInterval(() => {
      this.userAccessToken = localStorage.getItem('userAccessToken');
    }, 50);
    // this.prdIDs = this.getPrd.getPrdIDs();
    // this.currentPrdId = Number(
    //   this.activatedRoute.snapshot.paramMap.get('pid')
    // );
    // this.prdDetails = this.getPrd.getPrdById(this.currentPrdId);
    this.activatedRoute.paramMap.subscribe((parm) => {
      this.currentPrdId = parm.get('pid');
      this.product
        .getPrdById(this.currentPrdId)
        .subscribe((prd) => (this.prdDetails = prd.data.product));
    });
  }
  addToCard() {
    this.card
      .addToCard(this.prdDetails, localStorage.getItem('ID'))
      .subscribe((data) => {
        if (data.cardLength) {
          this.card.cardLength.next(data.cardLength);
          console.log(data);
        }
      });
  }
  edit(id: any) {
    this.router.navigate(['prds/add', id]);
  }
  delete(id: any) {
    this.product.deletePrd(id).subscribe((e) => {
      this.router.navigate(['prd']);
    });
  }
  back() {
    this.location.back();
  }
}
