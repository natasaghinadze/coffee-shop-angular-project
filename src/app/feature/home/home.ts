import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Cards } from '../../shared/components/cards/cards';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, Cards],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  coffees = [
    {
      id: 1,
      name: 'House Blend',
      description: 'Medium roast · 250g whole beans',
      price: 12,
      image: 'assets/images/Coffee-product-image(2).png'
    },
    {
      id: 2,
      name: 'Espresso Roast',
      description: 'Dark roast · 250g whole beans',
      price: 14,
      image: 'assets/images/Coffee-product-image.png'
    },
    {
      id: 3,
      name: 'Decaf Blend',
      description: 'Decaf · 250g whole beans',
      price: 13,
      image: 'assets/images/Coffee-product-image(3).png'
    }
  ];
}
