import {Component, OnInit} from '@angular/core';
import {Menubar} from 'primeng/menubar'
import {MenuItem} from 'primeng/api'
import {CartService} from '../../Services/cart.service'
import {CartItem} from '../../Models/CartItem.model'

@Component({
    selector: 'app-header',
    imports: [
        Menubar
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit{
    items: MenuItem[] | undefined

    constructor(
        private readonly _cart: CartService
    ) {}


    ngOnInit(): void {
        this.items = [
            {
                label: 'Accueil',
                icon: 'pi pi-home',
                routerLink: 'home'
            },
            {
                label: 'Panier',
                icon: 'pi pi-shopping-cart',
                routerLink: 'cart',
                badge: '0'
            }
        ]

        this._cart.cartItems$.subscribe({
            next: (data: CartItem[]) => {
                this.items![1].badge = data.length.toString()
            }
        })
    }
}
