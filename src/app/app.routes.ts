import { Routes } from '@angular/router';
import { Home } from './feature/home/home';
import { Login } from './feature/auth/pages/login/login';
import { Register } from './feature/auth/pages/register/register';

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
    }
];
