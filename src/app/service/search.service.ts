// src/app/service/search.service.ts
import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SearchService {
  private readonly API_URL = 'https://vr8oq51rrl.execute-api.us-east-1.amazonaws.com/prod/productos/elastic-search';

  productos = signal<any[]>([]);
  query = signal<string>('');
  loading = signal(false);

  constructor(private http: HttpClient) {}

  buscar(query: string): void {
    this.query.set(query);
    this.loading.set(true);

    const body = {
      tenant_id: 'AuroraJewels',
      query,
      page: 1,
      size: 20
    };

    this.http.post<any>(this.API_URL, body).subscribe({
      next: (res) => {
        this.productos.set(res.results || []);
      },
      error: () => {
        this.productos.set([]);
      },
      complete: () => this.loading.set(false)
    });
    console.log("Resultados de búsqueda:", this.productos());
  }

  clear(): void {
    this.query.set('');
    this.productos.set([]);
  }
}
