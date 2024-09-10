import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavAuthComponent } from "../../components/nav-auth/nav-auth.component";
import { FooterComponent } from "../../components/footer/footer.component";

@Component({
  selector: 'app-auth-layout',
  standalone: true,
  imports: [RouterOutlet, NavAuthComponent, FooterComponent],
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.css',
})
export class AuthLayoutComponent {}
