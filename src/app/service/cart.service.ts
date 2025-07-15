// src/app/service/cart.service.ts
import { Injectable, computed, signal } from '@angular/core';
import { Producto } from './product.service';

interface ProductoConPrecioNumerico extends Omit<Producto, 'precio'> {
  precio: number;
}

export interface CartItem {
  producto: ProductoConPrecioNumerico;
  cantidad: number;
}

@Injectable({ providedIn: 'root' })
export class CartService {
  private cart = signal<CartItem[]>([]);
  readonly cartItems = this.cart.asReadonly();

  readonly total = computed(() =>
    this.cart().reduce((acc, item) => acc + item.cantidad * item.producto.precio, 0)
  );

  addToCart(producto: Producto): void {
    const current = this.cart();
    const existing = current.find(item => item.producto.id_producto === producto.id_producto);

    const productoNumerico: ProductoConPrecioNumerico = {
      ...producto,
      precio: parseFloat(producto.precio),
    };

    if (existing) {
      existing.cantidad++;
      this.cart.set([...current]);
    } else {
      this.cart.set([...current, { producto: productoNumerico, cantidad: 1 }]);
    }
  }

  removeFromCart(productoId: string): void {
    this.cart.set(this.cart().filter(item => item.producto.id_producto !== productoId));
  }

  increaseQuantity(productoId: string): void {
    this.cart.update(items =>
      items.map(item =>
        item.producto.id_producto === productoId
          ? { ...item, cantidad: item.cantidad + 1 }
          : item
      )
    );
  }

  decreaseQuantity(productoId: string): void {
    this.cart.update(items =>
      items.map(item =>
        item.producto.id_producto === productoId && item.cantidad > 1
          ? { ...item, cantidad: item.cantidad - 1 }
          : item
      )
    );
  }

  clearCart(): void {
    this.cart.set([]);
  }
}
