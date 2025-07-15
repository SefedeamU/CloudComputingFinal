import { Component, OnInit, computed, Signal, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product.service';
import { ProductComponent } from '../../shared/product/product.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { SearchService } from '../../service/search.service';
import { Observable } from 'rxjs';
import { Producto } from '../../service/product.service';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  categoriaId: string = '';
  searchQuery: string = '';
  usandoBusqueda = false;

  loading = signal(true); // 👈 añadimos esto
productos$ = signal<Producto[]>([]);

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    public searchService: SearchService
  ) {}

ngOnInit(): void {
  this.route.queryParams.subscribe(params => {
    const nuevaCategoriaId = params['id_categoria'];
    const nuevaBusqueda = params['search'];

    this.searchQuery = nuevaBusqueda;
    this.usandoBusqueda = !!nuevaBusqueda;
    this.loading.set(true); // 🔥 mostrar loading al inicio

    if (this.usandoBusqueda) {
      this.searchService.buscar(nuevaBusqueda);
      setTimeout(() => {
        this.productos$.set(this.searchService.productos());
        this.loading.set(false); // 👈 ocultar loading
      }, 1000);
    } else if (nuevaCategoriaId) {
      this.categoriaId = nuevaCategoriaId;
      this.productService.reset(this.categoriaId);

      setTimeout(() => {
        this.productos$.set(this.productService.getProductosSnapshot());
        this.loading.set(false); // 👈 ocultar loading
      }, 1500); // ajusta a lo que tarda el backend
    }
  });
}



  loadMore(): void {
    if (!this.usandoBusqueda) {
      this.productService.fetchNextPage();
    }
  }

  hasMore(): boolean {
    return !this.usandoBusqueda && this.productService.hasMore();
  }
}
