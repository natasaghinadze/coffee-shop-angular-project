import { Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Cards } from '../../shared/components/cards/cards';
import { ProductsService } from './services/products.service';
import { IProduct } from './models/product.interface';
import { CartService } from '../../core/service/cart';

@Component({
  selector: 'app-products',
  imports: [Cards],
  templateUrl: './products.html',
  styleUrl: './products.scss',
})
export class Products {
  private service = inject(ProductsService);
  private cart = inject(CartService);

  public products = toSignal(this.service.getAll(), { initialValue: [] });
  public search = signal('');
  public category = signal('all');

  public categories = computed(() => [...new Set(this.products().map(p => p.category))]);

  public filtered = computed(() =>
    this.products().filter(p =>
      p.name.toLowerCase().includes(this.search().trim().toLowerCase()) &&
      (this.category() === 'all' || p.category === this.category())
    )
  );

  public onAddToCart(product: IProduct): void {
    this.cart.add(product);
  }
}
