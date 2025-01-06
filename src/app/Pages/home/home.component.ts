import {Component, OnInit} from '@angular/core';
import {Product} from '../../Models/Product.model'
import {ProductService} from '../../Services/product.service'
import {ActivatedRoute} from '@angular/router'
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import {ShowProductsComponent} from '../../Components/show-products/show-products.component'
import {AddItemCart} from '../../Models/AddCart.model'
import {CartService} from '../../Services/cart.service'
import {Toast} from 'primeng/toast'
import {MessageService} from 'primeng/api'
import {ShowCartComponent} from '../../Components/show-cart/show-cart.component'

@Component({
    selector: 'app-home',
    imports: [
        FormsModule,
        ReactiveFormsModule,
        ShowProductsComponent,
        Toast,
        ShowCartComponent
    ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
    providers: [MessageService]
})
export class HomeComponent implements OnInit{
    products: Product[] = []

    constructor(
        private readonly _ar: ActivatedRoute,
        private readonly _p: ProductService,
        protected readonly _c: CartService,
        private readonly _m: MessageService
    ) {}

    ngOnInit(): void {
        this._ar.data.subscribe((data: any) => {
            this.products = data.products
        })
    }

    addToCart(item: AddItemCart) {
        this._c.AddToCart(item).subscribe({
            next: _ => {
                this._m.add({
                    severity: 'success',
                    summary: 'Panier',
                    detail: 'Ajout au panier réussi'
                })
            },
            error: err => {
                this._m.add({
                    severity: 'error',
                    summary: 'Panier',
                    detail: `Echec de l\'ajout au panier: ${err.message}`
                })
            }
        })
    }

    protected readonly CartService = CartService
}
