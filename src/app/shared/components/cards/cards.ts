import { Component, input } from '@angular/core';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [],
  templateUrl: './cards.html',
  styleUrl: './cards.scss',
})
export class Cards {
  name = input.required<string>();
  description = input.required<string>();
  price = input.required<number>();
  image = input.required<string>();
}
