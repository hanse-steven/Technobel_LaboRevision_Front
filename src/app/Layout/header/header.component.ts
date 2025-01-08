import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
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
    items: MenuItem[] = [
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

    constructor(
        private readonly _cart: CartService,
        private readonly _cdr: ChangeDetectorRef) {}

    ngOnInit(): void {
        this._cart.cartItems$.subscribe({
            next: (data: CartItem[]) => {
                let nb = data.reduce((sum, item) => sum + item.quantity, 0);
                this.items[1].badge = nb.toString();
                this.items = [...this.items]
            }
        })
    }
}
