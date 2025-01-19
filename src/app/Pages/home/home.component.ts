import {Component, OnInit} from '@angular/core';
import {Product} from '../../Models/Product.model'
import {ProductService} from '../../Services/product.service'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {ShowProductsComponent} from '../../Components/show-products/show-products.component'
import {AddItemCart} from '../../Models/AddCart.model'
import {CartService} from '../../Services/cart.service'
import {MessageService} from 'primeng/api'
import {ShowCartComponent} from '../../Components/show-cart/show-cart.component'

@Component({
    selector: 'app-home',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ShowProductsComponent,
        ShowCartComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    providers: [MessageService]
})
export class HomeComponent implements OnInit{
    products: Product[] = []

    constructor(
        private readonly _p: ProductService,
        protected readonly _c: CartService,
        private readonly _m: MessageService,
    ) {}

    ngOnInit(): void {
        this._p.products$.subscribe({
            next: data => this.products = Array.isArray(data) ? data : []
        })
    }

    addToCart(item: AddItemCart) {
        this._c.addToCart(item)
            .then(r => {
                this._m.add({
                    severity: 'success',
                    summary: 'Panier',
                    detail: 'Ajout au panier réussi' + r
                })
            })
            .catch(err => {
                this._m.add({
                    severity: 'error',
                    summary: 'Panier',
                    detail: `Echec de l\'ajout au panier: ${err.message}`
                })
            })
    }
}
