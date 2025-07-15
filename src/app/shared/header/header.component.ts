import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from '../login/login.component';
import { AuthService } from '../../service/auth.service';
import { AsyncPipe } from '@angular/common';
import { CartComponent } from '../../pages/cart/cart.component';
import { Router, RouterLink } from '@angular/router';
import { SearchService } from '../../service/search.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, LoginComponent, CartComponent, RouterLink, FormsModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {
  showLogin = false;
  isLoggedIn = false;
  searchValue = '';

  constructor(
    private authService: AuthService,
    private searchService: SearchService,
    private router: Router
  ) {}

  onSearchEnter(): void {
    const query = this.searchValue.trim();
    if (query.length > 0) {
      this.searchService.buscar(query);
      this.router.navigate(['/list-products'], { queryParams: { search: query } });
    }
  }

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
