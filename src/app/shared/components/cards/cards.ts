import { Component, input, output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './cards.html',
  styleUrl: './cards.scss',
})
export class Cards {
  id = input.required<number>();
  name = input.required<string>();
  description = input.required<string>();
  price = input.required<number>();
  image = input.required<string>();
  addToCart = output<void>();
}
