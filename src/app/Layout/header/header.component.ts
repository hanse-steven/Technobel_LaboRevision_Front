import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Menubar, MenubarSub} from 'primeng/menubar'
import {MenuItem, MenuItemCommandEvent} from 'primeng/api'
import {CartService} from '../../Services/cart.service'
import {CartItem} from '../../Models/CartItem.model'
import {User} from '../../Models/User.model';
import {AuthService} from '../../Services/auth.service';
import {Button, ButtonDirective} from 'primeng/button';

@Component({
    selector: 'app-header',
    imports: [
        Menubar,
        ButtonDirective,
        Button,
        MenubarSub
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss'
})

export class HeaderComponent implements OnInit{
    currentUser: User | undefined
    items: MenuItem[] = []

    constructor(
        private readonly _cart: CartService,
        private readonly _auth: AuthService,
    ) {
        this._auth.currentUser$.subscribe({
            next: (user) => { this.currentUser = user }
        })

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
                routerLink: 'home',
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
