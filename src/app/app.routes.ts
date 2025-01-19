import { Routes } from '@angular/router';
import {HomeComponent} from './Pages/home/home.component'
import {LoginComponent} from './Pages/login/login.component';
import {RegisterComponent} from './Pages/register/register.component';
import {HistoryComponent} from './Pages/history/history.component';
import {invoiceResolver} from './Resolvers/invoice.resolver';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: HomeComponent},
    {path: 'login', component: LoginComponent },
    {path: 'register', component: RegisterComponent },
    {path: 'history', component: HistoryComponent, resolve: {invoice: invoiceResolver}},
    {path: '**', redirectTo: 'home'}
];
