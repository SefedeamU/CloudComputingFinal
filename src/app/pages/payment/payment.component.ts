import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../service/cart.service';
import { AuthService } from '../../service/auth.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {
  cartService = inject(CartService);
  authService = inject(AuthService);
  http = inject(HttpClient);
  router = inject(Router);

  usuarioId = '';
  loading = false;

  ngOnInit() {
    const userId = this.authService.getUserId();
    this.usuarioId = userId ? userId : '';
  }

  comprar() {
    if (!this.usuarioId || this.cartService.cartItems().length === 0) {
      alert('⚠️ No hay usuario o productos para procesar.');
      return;
    }

    const body = {
      tenant_id: 'AuroraJewels',
      usuario_id: this.usuarioId,
      productos: this.cartService.cartItems().map(item => ({
        id: item.producto.id_producto,
        cantidad: item.cantidad,
      }))
    };

    this.loading = true;

    this.http.post('https://5q8sb9pixl.execute-api.us-east-1.amazonaws.com/dev/factura/crear', body)
      .subscribe({
        next: () => {
          alert('✅ Compra realizada con éxito!');
          this.cartService.clearCart();
          this.router.navigate(['/']); // Vuelve a inicio
        },
        error: () => {
          alert('❌ Hubo un problema al procesar la compra.');
        },
        complete: () => {
          this.loading = false;
        }
      });
  }

  total(): number {
    return this.cartService.total();
  }
}
