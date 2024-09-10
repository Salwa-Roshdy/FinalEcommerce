import { NgClass } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrdersService } from '../../core/services/orders.service';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './orders.component.html',
  styleUrl: './orders.component.css',
})
export class OrdersComponent implements OnInit {
  private readonly _ActivatedRoute = inject(ActivatedRoute);
  private readonly _OrdersService = inject(OrdersService);
  cartID: string | null = '';
  successMsg: boolean = false;
  msgError: string = '';
  orders: FormGroup = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null, [Validators.required]),
  });
  ngOnInit(): void {
    /*  console.log(this._OrdersService.UserData.id); */
    this._ActivatedRoute.paramMap.subscribe({
      next: (p) => {
        this.cartID = p.get('CartId');
        console.log(this.cartID);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  orderSubmit(): void {
    console.log(this.orders.value);
    this._OrdersService.checkout(this.cartID, this.orders.value).subscribe({
      next: (res) => {
        console.log(res);
        if (res.status === 'success') {
          window.open(res.session.url, '_self');
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
