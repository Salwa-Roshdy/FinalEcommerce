import { AuthService } from './../../core/services/auth.service';

import { IProduct } from './../../core/Interfaces/iproduct';
import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { OrdersService } from '../../core/services/orders.service';
import { Subscription } from 'rxjs';
import { Iorder } from '../../core/Interfaces/iorder';

@Component({
  selector: 'app-all-orders',
  standalone: true,
  imports: [],
  templateUrl: './all-orders.component.html',
  styleUrl: './all-orders.component.css',
})
export class AllOrdersComponent implements OnInit {
  private readonly _OrdersService = inject(OrdersService);
  private readonly _AuthService = inject(AuthService);
  getUserOrdersSubscribe?: Subscription;
  /*   cartInfo: Icart = {} as Icart; */
  ordersList: Iorder[] = [];
  userId: string = '';
  ngOnInit(): void {
    this._AuthService.saveUserData();

    this.userId = this._AuthService.userid;
    console.log(this.userId);

    this.getUserOrdersSubscribe = this._OrdersService
      .getUserOrders(this.userId)
      .subscribe({
        next: (res) => {
          console.log(res);
          this.ordersList=res

        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  ngOnDestroy(): void {
    /*     this.getUserOrdersSubscribe?.unsubscribe();
     */
  }
  
}
