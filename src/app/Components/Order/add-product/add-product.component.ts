import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { IProducts } from 'src/app/Models/iproducts';
import { ProductsService } from 'src/app/Services/products.service';
import { StaticProductsService } from 'src/app/Services/static-products.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css'],
})
export class AddProductComponent implements OnInit {
  editPrd: any;
  newProduct: IProducts = {} as IProducts;
  constructor(
    private Prd: ProductsService,
    private router: Router,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activeRoute.paramMap.subscribe((param) => {
      this.editPrd = param.get('id');
      console.log(this.editPrd);
    });
    if (this.editPrd) {
      this.Prd.getPrdById(this.editPrd).subscribe((prd) => {
        prd.imgUrl = '';
        this.newProduct = prd;
      });
    }
  }
  editPrdFun() {
    this.Prd.editPrd(this.editPrd, this.newProduct).subscribe((e) =>
      alert('product updated successfully')
    );
  }
  addProduct() {
    // const prd: IProducts = {
    //   id: 888,
    //   name: 'Sony',
    //   price: 100,
    //   quantity: 5,
    //   avQuantity: 8,
    //   categoryId: 3,
    //   imgUrl: 'assets/logo.jpg',
    // };

    this.newProduct.id = String(this.newProduct.id);
    this.Prd.insertPrd(this.newProduct).subscribe({
      next: (prd) => {
        alert('product Added successfully');
        this.router.navigate(['prd']);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
