import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Producto {
  id_producto: string;
  nombre: string;
  proveedor: string;
  categoria_nombre: string;
  precio: string;
  stock: number;
  direccion: string;
  imagen_url: string[];
}

@Injectable({ providedIn: 'root' })
export class ProductService {
  private API_URL = 'https://1kobbmlfu9.execute-api.us-east-1.amazonaws.com/dev/productos/categorias/listar';
  private productosSubject = new BehaviorSubject<Producto[]>([]);
  public productos$ = this.productosSubject.asObservable();
  private nextToken: string | null = null;
  private categoriaId: string = '';

  // --- LÓGICA ANTERIOR ELIMINADA ---
  // Se ha eliminado la variable 'productoIndex', ya no es necesaria.
  // private productoIndex = 1;

  constructor(private http: HttpClient) {}

  reset(categoriaId: string) {
    this.categoriaId = categoriaId;
    this.productosSubject.next([]);
    this.nextToken = null;
    this.fetchNextPage();
  }

  fetchNextPage(): void {
    // Si ya no hay token, no hacemos nada para evitar llamadas innecesarias.
    if (this.nextToken === null && this.productosSubject.value.length > 0) {
      return;
    }

    let params = new HttpParams()
      .set('tenant_id', 'AuroraJewels')
      .set('id_categoria', this.categoriaId)
      .set('limit', '20');

    if (this.nextToken) {
      params = params.set('nextToken', this.nextToken);
    }

    this.http
      .get<{ productos: Producto[]; nextToken: string | null }>(this.API_URL, { params })
      .pipe(
        tap((res) => {
          const currentProducts = this.productosSubject.value;

          // --- CAMBIO CLAVE ---
          // Aquí transformamos la respuesta del backend.
          // En lugar de usar un índice, usamos el 'id_producto' único para generar la URL de la imagen.
          // Esto asegura que cada producto tenga una imagen diferente y consistente.
          const productosConImagenUnica = res.productos.map((prod) => {

            // Generamos un array de 4 URLs de imagen. Cada una con una semilla ligeramente
            // diferente (añadiendo el índice -0, -1, etc.) para que incluso las múltiples
            // imágenes de un mismo producto sean diferentes entre sí.
            const imagenesUnicas = Array.from({ length: 4 }, (_, i) =>
              `https://picsum.photos/seed/${prod.id_producto}-${i}/800/600`
            );

            return {
              ...prod,
              imagen_url: imagenesUnicas // Sobrescribimos el array de URLs del backend.
            };
          });

          this.productosSubject.next([...currentProducts, ...productosConImagenUnica]);
          this.nextToken = res.nextToken;
        })
      )
      .subscribe({
        error: (err) => console.error('Error al obtener productos:', err)
      });
  }

  hasMore(): boolean {
    return this.nextToken !== null;
  }

  getProductosSnapshot(): Producto[] {
    return this.productosSubject.getValue();
  }

}
