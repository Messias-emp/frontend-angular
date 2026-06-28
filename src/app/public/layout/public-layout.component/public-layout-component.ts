import { Component } from '@angular/core';

import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent }
  from '../../../shared/components/navbar/footer.component';
import { Home } from '../../../shared/components/home/home';





@Component({
  standalone: true,
  selector: 'PublicLayoutComponent',
  imports: [ NavbarComponent, FooterComponent, Home],
  templateUrl: './public-layout-component.html',
  styleUrl: './public-layout-component.scss',



})
export class PublicLayoutComponent {


}

