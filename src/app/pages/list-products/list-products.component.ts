import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../service/product.service';
import { ProductComponent } from '../../shared/product/product.component';
import { HeaderComponent } from '../../shared/header/header.component';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, ProductComponent, HeaderComponent],
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent implements OnInit {
  categoriaId: string = '';

  constructor(
    private route: ActivatedRoute,
    public productService: ProductService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.categoriaId = params['id_categoria'];
      if (this.categoriaId) {
        this.productService.reset(this.categoriaId);
      }
    });
  }

  loadMore(): void {
    this.productService.fetchNextPage();
  }

  hasMore(): boolean {
    return this.productService.hasMore();
  }
}
