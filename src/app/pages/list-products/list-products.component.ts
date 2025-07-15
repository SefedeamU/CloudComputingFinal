import { Component, OnInit, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product.service';
import { ProductComponent } from '../../shared/product/product.component';
import { HeaderComponent } from '../../shared/header/header.component';
import { SearchService } from '../../service/search.service';

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

  productos$ = computed(() => {
    return this.usandoBusqueda
      ? this.searchService.productos()
      : this.productService.getProductosSnapshot(); // ✅ uso del nuevo getter
  });

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService,
    public searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoriaId = params['id_categoria'];
      this.searchQuery = params['search'];
      this.usandoBusqueda = !!this.searchQuery;

      if (this.usandoBusqueda) {
        // ya vienen cargados desde el searchService
      } else if (this.categoriaId) {
        this.productService.reset(this.categoriaId);
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
