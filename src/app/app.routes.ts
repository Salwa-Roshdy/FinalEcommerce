import { Routes } from '@angular/router';
import path from 'node:path';
import { HomeComponent } from './components/home/home.component';
import { CartComponent } from './components/cart/cart.component';
import { homedir } from 'node:os';
import { Component } from '@angular/core';
import { CategoriesComponent } from './components/categories/categories.component';
import { title } from 'node:process';
import { ProductsComponent } from './components/products/products.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { BrandsComponent } from './components/brands/brands.component';
import { authGuard } from './core/guards/auth.guard';
import { loggedGuard } from './core/guards/logged.guard';
import { DetailsComponent } from './components/details/details.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { CategoryDetailsComponent } from './components/category-details/category-details.component';
import { AllOrdersComponent } from './components/all-orders/all-orders.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

export const routes: Routes = [
  {
    path: '',
    component: AuthLayoutComponent,
    canActivate: [loggedGuard],
    children: [
      { path: '', component: LoginComponent, pathMatch: 'full' },
      { path: 'login', component: LoginComponent, title: 'login' },
      { path: 'register', component: RegisterComponent, title: 'register' },
      {
        path: 'forgot',
        component: ForgotPasswordComponent,
        title: 'forgottenPassword',
      },
    ],
  },
  {
    path: '',
    component: BlankLayoutComponent,
    canActivate: [authGuard],
    children: [
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'home', component: HomeComponent, title: 'home' },
      { path: 'brands', component: BrandsComponent, title: 'brands' },
      { path: 'cart', component: CartComponent, title: 'cart' },
      {
        path: 'categories',
        component: CategoriesComponent,
        title: 'categories',
      },
      { path: 'products', component: ProductsComponent, title: 'products' },
      { path: 'details/:ProductId', component: DetailsComponent },
      {
        path: 'categoryDetails/:categoryID',
        component: CategoryDetailsComponent,
      },
      {
        path: 'allorders',
        component: AllOrdersComponent,
      },
      {
        path: 'orders/:CartId',
        component: OrdersComponent,
      },
      {
        path: 'wishlist',
        component: WishlistComponent,
      },
    ],
  },

  {
    path: '**',
    component: NotfoundComponent,
  },
];
