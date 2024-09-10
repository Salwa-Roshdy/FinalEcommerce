import { Component, inject, OnInit } from '@angular/core';
import { WishlistService } from '../../core/services/wishlist.service';
import { Subscription } from 'rxjs';
import { Wishlist } from '../../core/Interfaces/wishlist';
import { CurrencyPipe } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { IProduct } from '../../core/Interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './wishlist.component.html',
  styleUrl: './wishlist.component.css',
})
export class WishlistComponent implements OnInit {
  private readonly _WishlistService = inject(WishlistService);
  private readonly _NgxSpinnerService = inject(NgxSpinnerService);
  readonly _CartService = inject(CartService);
  getWishlistSubscribe?: Subscription;
  WishListInfo: IProduct[] = [];
  private _ToastrService = inject(ToastrService);
  ngOnInit(): void {
    this.getWishlistSubscribe = this._WishlistService
      .getProductsWishlist()
      .subscribe({
        next: (res) => {
          console.log(res.data);
          this.WishListInfo = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  ngOnDestroy(): void {
    this.getWishlistSubscribe?.unsubscribe();
  }
  getWishList(): void {
    this._WishlistService.getProductsWishlist().subscribe({
      next: (res) => {
        console.log(res.data);
        this.WishListInfo = res.data;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  removeItem(productId: string): void {
    this._WishlistService.removeSpecificItem(productId).subscribe({
      next: (res) => {
        console.log(res.message);
        console.log(res);
        /*       this.WishListInfo = res.data; */
        this.getWishList();
        /*  console.log('pid' + productID); */
        this._ToastrService.success(res.message, 'Fresh Cart');
      },
    });
  }
  AddtoCart(product: string): void {
    this._CartService.AddToCart(product).subscribe({
      next: (res) => {
        console.log(res.message);

        console.log(res);

        this._ToastrService.success(res.message, 'Fresh Cart');
      },
    });
  }
}
