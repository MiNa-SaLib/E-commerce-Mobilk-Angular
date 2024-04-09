import { Component, OnDestroy, OnInit, Pipe } from '@angular/core';
import { Subscription, filter, first, take } from 'rxjs';
import { ProductsService } from 'src/app/Services/products.service';
import { PromotionAdsService } from 'src/app/Services/promotion-ads.service';
import { UserRegistrationService } from 'src/app/Services/user-registration.service';
import { StoreData } from 'src/app/ViewModels/store-data';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  isToggle: boolean = true;
  storeInfo: StoreData;
  userName: string = '';
  recommendedProducts: any;
  constructor(
    private products: ProductsService,
    private userAuth: UserRegistrationService
  ) {
    this.storeInfo = new StoreData('assets/homeland.webp', ['alex', 'cairo']);
    this.userAuth.userName.subscribe((name) => (this.userName = name));
  }

  ngOnInit(): void {
    this.products.getRecommended().subscribe((prd) => {
      this.recommendedProducts = prd.data.products;
      this.recommendedProducts.length = 4;
      console.log(this.recommendedProducts[0]._id);
    });
  }

  ngOnDestroy(): void {}

  istoggle() {
    this.isToggle = !this.isToggle;
  }
}
