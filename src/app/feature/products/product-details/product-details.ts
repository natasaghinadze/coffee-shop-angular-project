import { Component, inject, input } from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { RouterLink } from '@angular/router';
import { catchError, of, switchMap } from 'rxjs';
import { ProductsService } from '../services/products.service';
import { IProduct } from '../models/product.interface';
import { CartService } from '../../../core/service/cart';

@Component({
  selector: 'app-product-details',
  imports: [RouterLink],
  templateUrl: './product-details.html',
  styleUrl: './product-details.scss',
})
export class ProductDetails {
  private service = inject(ProductsService);
  private cart = inject(CartService);

  // :id route პარამეტრი (withComponentInputBinding-ის წყალობით)
  public id = input.required<string>();

  // undefined = იტვირთება, null = ვერ მოიძებნა
  public product = toSignal(
    toObservable(this.id).pipe(
      switchMap(id => this.service.getById(id).pipe(catchError(() => of(null))))
    )
  );

  public onAddToCart(product: IProduct): void {
    this.cart.add(product);
  }
}
