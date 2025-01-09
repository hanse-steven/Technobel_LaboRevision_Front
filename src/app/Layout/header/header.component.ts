import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Menubar} from 'primeng/menubar'
import {MenuItem, MenuItemCommandEvent} from 'primeng/api'
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
    items: MenuItem[]

    constructor(
        private readonly _cart: CartService,
    ) {
        this.items = [
            {
                label: 'Accueil',
                icon: 'pi pi-home',
                routerLink: 'home'
            },
            {
                label: 'Panier',
                icon: 'pi pi-shopping-cart',
                badge: '0',

                command(_) {
                    _cart.showCart$.next(!_cart.showCart$.value)
                }
            }
        ]
    }

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
