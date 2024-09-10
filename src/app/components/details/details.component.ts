import { Component, inject, OnInit } from '@angular/core';
import { ProductService } from '../../core/services/product.service';
import { routes } from '../../app.routes';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../core/Interfaces/iproduct';
import { CartService } from '../../core/services/cart.service';
import { CurrencyPipe, NgClass } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { WishlistService } from '../../core/services/wishlist.service';
import { Wishlist } from '../../core/Interfaces/wishlist';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CurrencyPipe, NgClass],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _ProductService = inject(ProductService);
  private readonly _CartService = inject(CartService);
  private readonly _ToastrService = inject(ToastrService);
  private _WishlistService = inject(WishlistService);
  product: IProduct | null = null;
  wishList: Wishlist[] = [];
  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        let productID = p.get('ProductId');
        this._ProductService.getSpecificProducts(productID).subscribe({
          next: (res) => {
            this.product = res.data;
            console.log(this.product);
          },
          error: (err) => {
            console.log(err);
          },
        });
      },
    });
    this._WishlistService.getProductsWishlist().subscribe({
      next: (res) => {
        console.log(res);
        this.wishList = res.data;
        console.log(this.wishList);
      },
    });
  }
  AddToCart(productID: string): void {
    this._CartService.AddToCart(productID).subscribe({
      next: (res) => {
        console.log(res);
        this._ToastrService.success(res.messagem, 'Fresh Cart');
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
