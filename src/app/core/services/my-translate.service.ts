import { isPlatformBrowser } from '@angular/common';
import {
  inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private readonly _TranslateService = inject(TranslateService);
  private readonly _PlatID = inject(PLATFORM_ID);
  private readonly _Renderer2 = inject(RendererFactory2).createRenderer(
    null,
    null
  );
  constructor() {
    if (isPlatformBrowser(this._PlatID)) {
      this._TranslateService.setDefaultLang('en');
      this.setLanguage();
    }
  }
  setLanguage(): void {
    let savedLang = localStorage.getItem('lang');
    if (savedLang !== null) {
      this._TranslateService.use(savedLang!);
    }
    if (savedLang === 'en') {
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
      this._Renderer2.setAttribute(document.documentElement, 'lang', 'en');
    } else if (savedLang === 'ar') {
      this._Renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this._Renderer2.setAttribute(document.documentElement, 'lang', 'ar');
    }
  }
  changelan(lang: string): void {
    if (isPlatformBrowser(this._PlatID)) {
      localStorage.setItem('lang', lang);
      this.setLanguage();
    }
  }
}
