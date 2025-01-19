import {Component, OnInit} from '@angular/core';
import {Menubar} from 'primeng/menubar'
import {MenuItem, MenuItemCommandEvent, MessageService} from 'primeng/api'
import {CartService} from '../../Services/cart.service'
import {CartItem} from '../../Models/CartItem.model'
import {User} from '../../Models/User.model';
import {AuthService} from '../../Services/auth.service';
import {ShowProductsComponent} from '../../Components/show-products/show-products.component';
import {Toast} from 'primeng/toast';

@Component({
    selector: 'app-header',
    imports: [
        Menubar,
        Toast,
    ],
    templateUrl: './header.component.html',
    styleUrl: './header.component.scss',
})

export class HeaderComponent implements OnInit{
    currentUser: User | undefined
    items: MenuItem[] = []
    private nbItems: number = 0

    constructor(
        private readonly _cart: CartService,
        private readonly _auth: AuthService,
    ) {}

    ngOnInit(): void {
        this.items = this.GetMenuItems()

        this._auth.currentUser$.subscribe({
            next: (user) => {
                this.currentUser = user
                this.items = this.GetMenuItems()
            }
        })

        this._cart.cartItems$.subscribe({
            next: (data: CartItem[]) => {
                this.nbItems = data.reduce((sum, item) => sum + item.quantity, 0)
                this.items = this.GetMenuItems()
            }
        })
    }

    private GetMenuItems(): MenuItem[] {
        return  [
            {
                label: 'Accueil',
                icon: 'pi pi-home',
                routerLink: 'home'
            },
            {
                label: 'Panier',
                icon: 'pi pi-shopping-cart',
                badge: this.nbItems.toString(),
                routerLink: 'home',
                command: (_)=> {
                    this._cart.showCart$.next(!this._cart.showCart$.value)
                }
            },
            {
                label: 'Historique de commandes',
                icon: 'pi pi-history',
                routerLink: 'history',
                visible: this.currentUser !== undefined,
            },
            {
                label: 'Connexion',
                icon: 'pi pi-user',
                routerLink: 'login',
                visible: this.currentUser === undefined,
            },
            {
                label: 'Inscription',
                icon: 'pi pi-user-plus',
                routerLink: 'register',
                visible: this.currentUser === undefined,
            },
            {
                label: 'Déconnexion',
                icon: 'pi pi-user-minus',
                visible: this.currentUser !== undefined,
                command: (_) => {
                    this._auth.logout()
                }
            }
        ]
    }
}
