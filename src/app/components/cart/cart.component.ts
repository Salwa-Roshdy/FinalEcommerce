import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { CartService } from '../../core/services/cart.service';
import { error } from 'console';
import { Subscription } from 'rxjs';
import { Icart } from '../../core/Interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnInit, OnDestroy {
  private readonly _CartService = inject(CartService);
  getproductscartSubscribe?: Subscription;
  cartInfo: Icart = {} as Icart;
  ngOnInit(): void {
    this.getproductscartSubscribe = this._CartService
      .getProductsCart()
      .subscribe({
        next: (res) => {
          console.log(res.data);
          this.cartInfo = res.data;
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  ngOnDestroy(): void {
    this.getproductscartSubscribe?.unsubscribe();
  }
  removeItem(ItemID: string): void {
    this._CartService.removeSpecificItem(ItemID).subscribe({
      next: (res) => {
        this.cartInfo = res.data;
        this._CartService.CartCount = res.numOfCartItems;
      },
    });
  }
  updateProductQuantity(itemID: string, Count: number): void {
    if (Count > 0) {
      this._CartService.updateProductQuantity(itemID, Count).subscribe({
        next: (res) => {
          console.log(res.data);
          this.cartInfo = res.data;
          this._CartService.CartCount = res.numOfCartItems;
        },
        error: (err) => {
          console.log(err);
        },
      });
    } else if (Count <= 0) {
      this.removeItem(itemID);
    }
  }
  clearCart() {
    this._CartService.ClearUserCart().subscribe({
      next: (res) => {
        if (res.message == 'success') {
          this.cartInfo = {} as Icart;
          this._CartService.CartCount = 0;
        }
      },
    });
  }
}
