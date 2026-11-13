import { Routes } from '@angular/router';

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
        title: 'Products | Brewly',
        loadComponent: () => import('./feature/products/products').then(m => m.Products),
    },
    {
        path: '**',
        title: 'Page not found | Brewly',
        redirectTo: 'home', 
    },
];
