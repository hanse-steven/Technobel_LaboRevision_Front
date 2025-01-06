import { Routes } from '@angular/router';
import {HomeComponent} from './Pages/home/home.component'
import {productAllResolver} from './Resolver/product-all.resolver'

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent, resolve: {products: productAllResolver}}
];
