import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryService, Categoria } from '../../service/category.service';
import { HeaderComponent } from '../../shared/header/header.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, HeaderComponent],
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  categories: Categoria[] = [];
  animations: string[] = [];
  offsets: string[] = [];

  constructor(private categoryService: CategoryService, private router: Router) {}

  ngOnInit(): void {
    this.categoryService.fetchCategorias();

    this.categoryService.categorias$.subscribe((categorias) => {
      this.categories = categorias;
      this.setupFloatingEffects(this.categories.length);
    });
  }

  private setupFloatingEffects(count: number): void {
    const offsetOptions = [
      'translate-y-1 rotate-1',
      '-translate-y-1 -rotate-1',
      'translate-x-1',
      '-translate-x-1',
      'rotate-1',
      '-rotate-1'
    ];

    const animationOptions = [
      'animate-float-down',
      'animate-float-down-delay',
      'animate-float-down-alt'
    ];

    this.offsets = [];
    this.animations = [];

    for (let i = 0; i < count; i++) {
      this.offsets[i] = offsetOptions[Math.floor(Math.random() * offsetOptions.length)];
      this.animations[i] = animationOptions[i % animationOptions.length];
    }
  }

  onCategoryClick(category: Categoria): void {
    console.log('Categoría seleccionada:', category.nombre);
    console.log('ID:', category.id_categoria_producto);
      this.router.navigate(['/productos'], {
      queryParams: { id_categoria: category.id_categoria_producto }
    });
  }
}
