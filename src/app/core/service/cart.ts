import { computed, effect, Injectable, signal } from '@angular/core';
import { CartProduct, ICartItem } from '../../feature/cart/cart-item.interface';

const STORAGE_KEY = 'brewly-cart';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly _items = signal<ICartItem[]>(this.load());

  public readonly items = this._items.asReadonly();
  public readonly count = computed(() => this._items().reduce((sum, i) => sum + i.quantity, 0));
  public readonly total = computed(() => this._items().reduce((sum, i) => sum + i.price * i.quantity, 0));

  constructor() {
    // ყოველი ცვლილებისას ვინახავთ, რომ რეფრეშზე კალათა არ დაიკარგოს
    effect(() => {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this._items()));
      } catch { /* storage მიუწვდომელია, კალათა მხოლოდ მეხსიერებაში იმუშავებს */ }
    });
  }

  public add(product: CartProduct, quantity = 1): void {
    this._items.update(items => {
      const existing = items.find(i => i.id === product.id);
      if (existing) {
        return items.map(i => i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i);
      }
      const { id, name, description, price, image } = product;
      return [...items, { id, name, description, price, image, quantity }];
    });
  }

  public increase(id: number): void {
    this._items.update(items => items.map(i => i.id === id ? { ...i, quantity: i.quantity + 1 } : i));
  }

  public decrease(id: number): void {
    this._items.update(items =>
      items
        .map(i => i.id === id ? { ...i, quantity: i.quantity - 1 } : i)
        .filter(i => i.quantity > 0)
    );
  }

  public remove(id: number): void {
    this._items.update(items => items.filter(i => i.id !== id));
  }

  public clear(): void {
    this._items.set([]);
  }

  private load(): ICartItem[] {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  }
}
