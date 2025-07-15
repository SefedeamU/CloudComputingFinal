import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {
  private http = inject(HttpClient);
  private authService = inject(AuthService);

  facturas: any[] = [];
  loading = true;
  error: string | null = null;

  ngOnInit(): void {
    const usuarioId = this.authService.getUserId();

    if (!usuarioId) {
      this.error = 'No se ha iniciado sesión.';
      this.loading = false;
      return;
    }

    const body = {
      tenant_id: 'AuroraJewels',
      usuario_id: usuarioId
    };

    this.http.post<any>('https://5q8sb9pixl.execute-api.us-east-1.amazonaws.com/dev/factura/listar', body)
      .subscribe({
        next: (res) => {
          if (res?.facturas?.length) {
            this.facturas = res.facturas;
          } else {
            this.error = 'No se encontraron compras.';
          }
          this.loading = false;
        },
        error: () => {
          this.error = 'Hubo un problema al obtener tus compras.';
          this.loading = false;
        }
      });
  }
}
