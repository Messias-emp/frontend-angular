import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { map, Observable } from 'rxjs';
import { CartService } from '../../../core/services/cart.service';
import { MatIcon, MatIconModule } from "@angular/material/icon";
import { MatToolbar, MatToolbarModule } from "@angular/material/toolbar";
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { MatMenuModule } from '@angular/material/menu';



@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, MatIcon, MatToolbar,MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatToolbarModule,
  MatBadgeModule,
  MatMenuModule],
  templateUrl: './navbar.component.html'
})

export class NavbarComponent implements OnInit {

  isLoggedIn$!: Observable<boolean>;
  userName$!: Observable<string | null>;
  cartCount$!: Observable<number>;

  constructor(
    private auth: AuthService,
    private router: Router,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn$ = this.auth.isLoggedIn$;
    this.userName$ = this.auth.userName$; // 👤 novo, reativo
    this.cartCount$ = this.cartService.items$ .pipe(
    map(items => items.reduce((count, item) => count + item.quantity, 0)));// 🛒 novo, reativo
  }

  isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
