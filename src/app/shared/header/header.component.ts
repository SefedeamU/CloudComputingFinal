import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../service/auth.service';
import { AsyncPipe } from '@angular/common';
import { CartComponent } from '../../pages/cart/cart.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LoginComponent, CartComponent],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  showLogin = false;
  isLoggedIn = false;

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subscribirse al estado reactivo
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  openLoginModal() {
    this.showLogin = true;
  }

  closeLoginModal() {
    this.showLogin = false;
  }

  logout() {
    this.authService.logout();
  }
}
