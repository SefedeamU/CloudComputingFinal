import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

interface LoginPayload {
  tenant_id: string;
  email: string;
  password: string;
}

interface RegisterPayload {
  tenant_id: string;
  nombres: string;
  apellidos: string;
  email: string;
  telefono: string;
  direccion: {
    calle: string;
    ciudad: string;
    pais: string;
  };
  password: string;
}

interface LoginResponse {
  token: string;
  user_id: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly LOGIN_URL = 'https://30ipk5jpl6.execute-api.us-east-1.amazonaws.com/dev/usuarios/login';
  private readonly REGISTER_URL = 'https://30ipk5jpl6.execute-api.us-east-1.amazonaws.com/dev/usuarios/crear';
  private readonly TENANT_ID = 'AuroraJewels';

  private isLoggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  public isLoggedIn$ = this.isLoggedInSubject.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<LoginResponse> {
    const body: LoginPayload = {
      tenant_id: this.TENANT_ID,
      email,
      password,
    };

    return this.http.post<LoginResponse>(this.LOGIN_URL, body).pipe(
      tap((res) => {
        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('user_id', res.user_id);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  register(data: Omit<RegisterPayload, 'tenant_id'>): Observable<LoginResponse> {
    const payload: RegisterPayload = {
      tenant_id: this.TENANT_ID,
      ...data,
    };

    return this.http.post<LoginResponse>(this.REGISTER_URL, payload).pipe(
      tap((res) => {
        localStorage.setItem('auth_token', res.token);
        localStorage.setItem('user_id', res.user_id);
        this.isLoggedInSubject.next(true);
      })
    );
  }

  logout(): void {
    localStorage.clear();
    this.isLoggedInSubject.next(false);
  }

  isAuthenticated(): boolean {
    return this.hasToken();
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getUserId(): string | null {
    return localStorage.getItem('user_id');
  }
  
}
