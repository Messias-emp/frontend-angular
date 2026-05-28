import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterModule } from '@angular/router';



/* =============================
   CONTRATO LOCAL (TIPAGEM)
   ============================= */
interface LoginResponse {
  success: boolean;
  message: string;
  data: {
    token: string;
    role: string;
  };
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {

  email = '';
  password = '';
  error: string | null = null;
  loading = false;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.loading = true;
    this.error = null;

    this.auth.login(this.email, this.password).subscribe({
     next: (response: LoginResponse) => {
  this.auth.saveToken(response.data.token);

  // 🔐 validação defensiva
  if (!this.auth.isLoggedIn()) {
    this.error = 'Falha ao autenticar';
    return;
  }

  // 🎯 decisão única
  const target = this.auth.isAdmin()
    ? '/admin/dashboard'
    : '/meus-pedidos';

  this.router.navigateByUrl(target);
}
    });
  } }