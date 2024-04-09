import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './Components/home/home.component';
import { ProductListComponent } from './Components/Order/product-list/product-list.component';
import { OrderMasterComponent } from './Components/Order/order-master/order-master.component';
import { NotFoundComponent } from './Components/NotFound/NotFound.component';
import { MainLayoutComponent } from './Components/main-layout/main-layout.component';
import { UserLoginComponent } from './Components/user-login/user-login.component';
import { ProductDetailsComponent } from './Components/Order/product-details/product-details.component';
import { AuthGuard } from './Guards/auth.guard';
import { AddProductComponent } from './Components/Order/add-product/add-product.component';
import { UserRegisterComponent } from './Components/user-register/user-register.component';
import { CardComponent } from './Components/card/card.component';
import { PolicyComponent } from './Components/policy/policy.component';
import { ShippingPolicyComponent } from './Components/shipping-policy/shipping-policy.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' }, //default component
      { path: 'home', component: HomeComponent },
      { path: 'prd', component: ProductListComponent },
      { path: 'prd/:pid', component: ProductDetailsComponent },
      { path: 'prds/:Add', component: AddProductComponent },
      { path: 'prds/:Add/:id', component: AddProductComponent },
      { path: ':id/card', component: CardComponent },
      { path: 'policy', component: PolicyComponent },
      { path: 'Shipping-policy', component: ShippingPolicyComponent },
      {
        path: 'order',
        component: OrderMasterComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'login', component: UserLoginComponent },
  { path: 'register', component: UserRegisterComponent },
  { path: '**', component: NotFoundComponent }, //wild card path(اليوزر لو كان بدماغ كلب)
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
