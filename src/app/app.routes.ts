import { Routes } from '@angular/router';
import {HomeComponent} from './Pages/home/home.component'

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, data: {cart: false}},
    {path: 'cart', component: HomeComponent, data: {cart: true}}
];
