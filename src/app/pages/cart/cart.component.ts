import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../service/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  showPanel = signal(false);

  constructor(
    public cartService: CartService,
    private router: Router
  ) {}

  togglePanel() {
    this.showPanel.update(v => !v);
  }

  pagar() {
    this.togglePanel(); // Cierra panel
    this.router.navigate(['/pago']); // Redirige
  }
}
