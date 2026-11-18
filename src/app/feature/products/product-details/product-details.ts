import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { ProductsService } from '../services/products.service';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  private service = inject(ProductsService);

  public id = input.required<string>();

  public product = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => this.service.getById(id).pipe(catchError(() => of(null))))
    )
  );

  public onAddToCart(productId: number): void {
    console.log('Add to cart:', productId);
  }
}
