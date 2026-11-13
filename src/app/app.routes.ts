import { Routes } from '@angular/router';
import { Home } from './feature/home/home';
import { Login } from './feature/auth/pages/login/login';
import { Register } from './feature/auth/pages/register/register';
import { AboutUs } from './feature/about-us/about-us';

export const routes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: "full"
    },
    {
        path: 'home', component: Home
    },
    {
        path: 'login',
        component: Login
    },
    {
        path: 'register',
        component: Register
    },
    {
        path: 'about-us',
        component: AboutUs
    }
];
