import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { Subscription } from 'rxjs';
import { IProduct } from '../../core/Interfaces/iproduct';
import { RouterLink } from '@angular/router';
import { CurrencyPipe, NgClass } from '@angular/common';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart.service';
import { TermSplitPipe } from '../../core/pipes/term-split.pipe';
import { SalePipe } from '../../core/pipes/sale.pipe';
import { FormsModule } from '@angular/forms';
import { SearchPipe } from '../../core/pipes/search.pipe';
import { Wishlist } from '../../core/Interfaces/wishlist';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [
    RouterLink,
    CurrencyPipe,
    TermSplitPipe,
    SalePipe,
    FormsModule,
    SearchPipe,
    NgClass,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css',
})
export class ProductsComponent implements OnInit, OnDestroy {
  private readonly _ProductService = inject(ProductService);
  readonly _CartService = inject(CartService);
  private _ToastrService = inject(ToastrService);
  private _WishlistService = inject(WishlistService);
  temSearch: string = '';
  productList: IProduct[] = [];

  wishList: Wishlist[] = [];
  specificproductSubscribe?: Subscription;
  specificproduct: IProduct = {} as IProduct;
  ngOnInit(): void {
    this._ProductService.getAllProduct().subscribe({
      next: (res) => {
        console.log(res);
        this.productList = res.data;

        console.log(this.productList);
      },
      error: (err) => {
        console.log(err);
      },
    });
    this.getWishList();
  }
  ngOnDestroy(): void {
    this.specificproductSubscribe?.unsubscribe();
  }
  getSpecificproduct(productId: string): void {
    this._ProductService.getSpecificProducts(productId).subscribe({
      next: (res) => {
        console.log(res);
        this.specificproduct = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  AddToCart(productID: string): void {
    this._CartService.AddToCart(productID).subscribe({
      next: (res) => {
        console.log(res.message);
        this._ToastrService.success(res.message, 'Fresh Cart');
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  getWishList(): void {
    this._WishlistService.getProductsWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishList = res.data;
        console.log(this.wishList);
      },
    });
  }
  AddToWishList(id: string): void {
    this._WishlistService.AddToWishlist(id).subscribe({
      next: (res) => {
        console.log(res.message);

        this.wishList = res.data;
        console.log('wish updated', res.data);

        /*  console.log('pid' + productID); */
        this.getWishList();
        this._ToastrService.success(res.message, 'Fresh Cart');
      },
    });
  }
  toggleWishlist(product: IProduct): void {
    if (this.inwishlist(product)) {
      /*     console.log('inwishlist', this.inwishlist(product)); */
      this.removeFromWishlist(product._id);
    } else {
      this.AddToWishList(product._id);
    }
  }

  inwishlist(product: IProduct): boolean {
    return this.wishList.some((item) => item._id == product._id);
  }
  removeFromWishlist(productId: string): void {
    this._WishlistService.removeSpecificItem(productId).subscribe({
      next: (res) => {
        console.log(res.message);
        console.log(res);
        this.wishList = res.data;
        this.getWishList();
        /*  console.log('pid' + productID); */
        this._ToastrService.success(res.message, 'Fresh Cart');
      },
    });
  }
}
