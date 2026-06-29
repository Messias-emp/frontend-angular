import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { NavbarComponent } from '../../../shared/components/navbar/navbar.component';
import { FooterComponent }
  from '../../../shared/components/navbar/footer.component';
import { Home } from '../../../shared/components/home/home';





@Component({
  standalone: true,
  selector: 'PublicLayoutComponent',
  imports: [RouterOutlet, NavbarComponent, FooterComponent],
  templateUrl: './public-layout-component.html',
  styleUrl: './public-layout-component.scss',



})
export class PublicLayoutComponent {


}

