import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  nombres = '';
  apellidos = '';
  email = '';
  telefono = '';
  calle = '';
  ciudad = '';
  pais = '';
  password = '';
  confirmPassword = '';
  error = '';
  success = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.error = '';
    this.success = '';

    if (this.password !== this.confirmPassword) {
      this.error = 'Las contraseñas no coinciden.';
      return;
    }

    this.authService
      .register({
        nombres: this.nombres,
        apellidos: this.apellidos,
        email: this.email,
        telefono: this.telefono,
        password: this.password,
        direccion: {
          calle: this.calle,
          ciudad: this.ciudad,
          pais: this.pais,
        },
      })
      .subscribe({
        next: () => {
          this.success = '¡Cuenta creada con éxito!';
          setTimeout(() => this.router.navigate(['/']), 1500);
        },
        error: (err) => {
          console.error(err);
          this.error = err?.error?.message || 'Error al registrar usuario.';
        },
      });
  }
}
