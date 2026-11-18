import { Routes } from '@angular/router';

export const PRODUCTS_ROUTES: Routes = [
  {
    path: '',
    title: 'Our coffee | Brewly',
    loadComponent: () => import('./products').then(m => m.Products),
  },
  {
    path: ':id',
    title: 'Product details | Brewly',
    loadComponent: () =>
      import('./product-details/product-details').then(m => m.ProductDetails),
  },
];
