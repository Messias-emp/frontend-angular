import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { environment } from '../../../environments/environment';

/* =============================
   CONTRATOS
   ============================= */
interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    role: string;
  };
}

interface JwtPayload {
  sub?: string;
  name?: string;
  role?: string;
  roles?: string[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = environment.apiUrl;
  private readonly TOKEN_KEY = 'token';

  constructor(private http: HttpClient) {}

  /* =============================
     🔔 ESTADOS REATIVOS
     ============================= */
  private loggedInSubject = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this.loggedInSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string | null>(
    this.getUserNameFromToken()
  );
  userName$ = this.userNameSubject.asObservable();

  private userRoleSubject = new BehaviorSubject<string | null>(
    this.getUserRoleFromToken()
  );
  userRole$ = this.userRoleSubject.asObservable();

  /* =============================
     🔐 LOGIN
     ============================= */
  login(email: string, password: string): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.apiUrl}/login`, {
      email,
      password
    });
  }

  /* =============================
     🪪 TOKEN
     ============================= */
  saveToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);

    this.loggedInSubject.next(true);
    this.userNameSubject.next(this.getUserNameFromToken());
    this.userRoleSubject.next(this.getUserRoleFromToken());
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);

    this.loggedInSubject.next(false);
    this.userNameSubject.next(null);
    this.userRoleSubject.next(null);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return this.hasToken();
  }

  /* =============================
     🛡️ AUTORIZAÇÃO (BLINDADA)
     ============================= */
isAdmin(): boolean {
  const token = localStorage.getItem('token');
  if (!token) return false;

  const decoded: any = jwtDecode(token);
  return decoded.role === 'ADMIN';
}
  /* =============================
     🔎 HELPERS PRIVADOS
     ============================= */
  private hasToken(): boolean {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  private getUserNameFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded.name || decoded.sub || null;
    } catch {
      return null;
    }
  }

  private getUserRoleFromToken(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const decoded: JwtPayload = jwtDecode(token);
      return decoded.role || (decoded.roles ? decoded.roles[0] : null);
    } catch {
      return null;
    }
  }

  /* =============================
     🧪 DEBUG (USAR SÓ EM DEV)
     ============================= */
  debugToken(): void {
    const token = this.getToken();
    if (!token) return;

    const decoded = jwtDecode<any>(token);
    console.group('🔍 TOKEN DECODIFICADO');
    console.log(decoded);
    console.groupEnd();
  }
}