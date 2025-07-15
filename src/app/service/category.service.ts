import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map } from 'rxjs';

export interface Categoria {
  nombre: string;
  id_categoria_producto: string;
  descripcion: string;
  tenant_id: string;
  cantidad_entradas: number;
  image?: string;
}

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private readonly API_URL =
    'https://1kobbmlfu9.execute-api.us-east-1.amazonaws.com/dev/categorias/listar?tenant_id=AuroraJewels';

  private readonly IMAGE_MAP: { [key: string]: string } = {
    Cocina: '/img/cocina.webp',
    Computadores: '/img/computadores.webp',
    Lavadoras: '/img/lavadoras.webp',
    Manuales: '/img/manuales.webp',
    Recreativo: '/img/recreativo.webp',
    Videojuegos: '/img/videojuegos.webp',
  };

  private categoriasSubject = new BehaviorSubject<Categoria[]>([]);
  public categorias$ = this.categoriasSubject.asObservable();

  constructor(private http: HttpClient) {}

  fetchCategorias(): void {
    this.http.get<{ categorias: Categoria[] }>(this.API_URL)
      .pipe(
        map((res) =>
          res.categorias.map((cat) => ({
            ...cat,
            id_categoria_producto: cat.id_categoria_producto.split('#')[0], // 🔥 Extraer solo el id de la categoría
            image: this.IMAGE_MAP[cat.nombre] || '/img/default.jpg',
          }))
        )
      )
      .subscribe({
        next: (data) => this.categoriasSubject.next(data),
        error: (err) => console.error('Error al cargar categorías', err),
      });
  }

  getCategoriaByNombre(nombre: string): Categoria | undefined {
    return this.categoriasSubject.getValue().find((c) => c.nombre === nombre);
  }
}
