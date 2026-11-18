import { Routes } from '@angular/router';

import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    {
        path: 'home',
        title: 'Home | Brewly',
        loadComponent: () => import('./feature/home/home').then(m => m.Home),
    },
    {
        path: 'login',
        title: 'Login | Brewly',
        loadComponent: () => import('./feature/auth/pages/login/login').then(m => m.Login),
    },
    {
        path: 'register',
        title: 'Register | Brewly',
        loadComponent: () => import('./feature/auth/pages/register/register').then(m => m.Register),
    },
    {
        path: 'about-us',
        title: 'About Us | Brewly',
        loadComponent: () => import('./feature/about-us/about-us').then(m => m.AboutUs),
    },
    {
        path: 'products',
        loadChildren: () => import('./feature/products/products.routes').then(m => m.PRODUCTS_ROUTES),
    },
    {
        path: 'cart',
        title: 'Cart | Brewly',
        loadComponent: () => import('./feature/cart/cart').then(m => m.Cart),
    },
    {
        path: 'checkout',
        title: 'Checkout | Brewly',
        canActivate: [authGuard],
        loadComponent: () => import('./feature/checkout/checkout').then(m => m.Checkout),
    },
    {
        path: '**',
        redirectTo: 'home',
    },
];
