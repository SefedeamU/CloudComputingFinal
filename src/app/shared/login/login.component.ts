import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  @Input() show = false;
  @Output() close = new EventEmitter<void>();

  email = '';
  password = '';
  error = '';
  showPassword = false;

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.error = '';

    if (!this.email || !this.password) {
      this.error = 'Correo y contraseña requeridos.';
      return;
    }

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.close.emit();
      },
      error: (err) => {
        console.error('Error al iniciar sesión:', err);
        this.error = err?.error?.message || 'Credenciales inválidas.';
      }
    });
  }

  cancel() {
    this.close.emit();
  }

  goToRegister() {
    this.close.emit(); // cierra modal
    this.router.navigate(['/register']); // redirige
  }
}
