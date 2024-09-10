import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavBlankComponent } from './components/nav-blank/nav-blank.component';
import { NgxSpinnerComponent } from 'ngx-spinner';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavBlankComponent, NgxSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Ecommerce';
}
