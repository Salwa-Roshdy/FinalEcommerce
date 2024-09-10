import { HttpInterceptorFn } from '@angular/common/http';
import { Token } from '@angular/compiler';

export const headersInterceptor: HttpInterceptorFn = (req, next) => {
  if (localStorage.getItem('Usertoken') !== null) {
    if (
      req.url.includes('cart') ||
      req.url.includes('orders') ||
      req.url.includes('wishlist')
    ) {
      req = req.clone({
        setHeaders: {
          token: localStorage.getItem('Usertoken')!,
        },
      });
    }
  }
  return next(req);
};
