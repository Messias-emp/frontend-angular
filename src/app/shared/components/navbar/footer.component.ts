import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer">
      <div>© {{ year }} - Projeto E-commerce </div>
    </footer>
  `,
  styles: [`
    .footer { padding:1rem; text-align:center; background:#f1f3f5; }
  `]
})
export class FooterComponent {
  year = new Date().getFullYear();
}
