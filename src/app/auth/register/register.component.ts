import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <h2>Registrar</h2>
    <form (submit)="onSubmit($event)">
      <input [(ngModel)]="name" name="name" placeholder="Nome" required />
      <input [(ngModel)]="email" name="email" placeholder="Email" required />
      <input [(ngModel)]="password" name="password" type="password" placeholder="Senha" required />
      <button type="submit">Criar conta</button>
    </form>
  `
})
export class RegisterComponent {
  name = '';
  email = '';
  password = '';
  private auth = inject(AuthService);
  private router = inject(Router);

  onSubmit(e: Event) {
    e.preventDefault();
    (this.auth as any).register(this.name, this.email, this.password).subscribe({
      next: () => this.router.navigate(['/login']),
      error: (err: any) => alert(err.error?.error || 'Erro no registro')
    });
  }
}
