import { Component, inject, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/my-translate.service';
import { CartService } from '../../core/services/cart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [RouterLink, RouterLinkActive, TranslateModule],
  templateUrl: './nav-blank.component.html',
  styleUrl: './nav-blank.component.css',
})
export class NavBlankComponent implements OnInit {
  readonly _AuthService = inject(AuthService);
  readonly _CartService = inject(CartService);

  private readonly _MyTranslateService = inject(MyTranslateService);
  readonly _TranslateService = inject(TranslateService);

  ngOnInit(): void {
    this._CartService.getProductsCart().subscribe({
      next: (res) => {
        console.log(res.numOfCartItems);
        this._CartService.CartCount = res.numOfCartItems;
      },
    });
  }
  changelan(lan: string): void {
    this._MyTranslateService.changelan(lan);
  }
}
