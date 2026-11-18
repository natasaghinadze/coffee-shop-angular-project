import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IProduct } from '../models/product.interface';

const baseUrl = 'http://localhost:3000';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private http = inject(HttpClient);

  public getAll(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${baseUrl}/products`);
  }

  public getById(id: string | number): Observable<IProduct> {
    return this.http.get<IProduct>(`${baseUrl}/products/${id}`);
  }
}
