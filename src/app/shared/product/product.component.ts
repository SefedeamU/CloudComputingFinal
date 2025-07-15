// src/app/shared/product/product.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Producto } from '../../service/product.service';
import { CartService } from '../../service/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent {
  @Input() producto!: Producto;

  constructor(private cartService: CartService) {}

  addToCart() {
    this.cartService.addToCart(this.producto);
  }
}
