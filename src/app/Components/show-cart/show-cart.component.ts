import {Component, Input, OnInit} from '@angular/core';
import {Button, ButtonDirective, ButtonLabel} from 'primeng/button'
import {TableModule} from 'primeng/table'
import {CurrencyPipe, NgClass, NgStyle} from '@angular/common'
import {Rating} from 'primeng/rating'
import {Tag} from 'primeng/tag'
import {CartItem} from '../../Models/CartItem.model'
import {Drawer} from 'primeng/drawer'
import {Router} from '@angular/router'
import {CartService} from '../../Services/cart.service'
import {MessageService} from 'primeng/api'
import {Card} from 'primeng/card';
import {FloatLabel} from 'primeng/floatlabel';
import {InputText} from 'primeng/inputtext';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ValidateCartForm} from '../../Forms/ValidateCart.form';
import {ProductService} from '../../Services/product.service';
import {Product} from '../../Models/Product.model';

@Component({
    selector: 'app-show-cart',
    imports: [
        Button,
        TableModule,
        CurrencyPipe,
        Drawer,
        FloatLabel,
        InputText,
        FormsModule,
        ReactiveFormsModule,
        ButtonDirective,
        ButtonLabel,
        NgClass,
        NgStyle,
    ],
    templateUrl: './show-cart.component.html',
    styleUrl: './show-cart.component.scss'
})
export class ShowCartComponent {
    items: CartItem[] = []
    isVisible!: boolean

    cartForm: FormGroup

    constructor(
        private readonly _c: CartService,
        private readonly _p: ProductService,
        private readonly _m: MessageService,
        private readonly _fb: FormBuilder
    ) {
        this.cartForm = this._fb.group({
            ...ValidateCartForm
        })

        this._c.cartItems$.subscribe({
            next: data => this.items = Array.isArray(data) ? data : []
        })

        this._c.showCart$.subscribe({
            next: data => this.isVisible = data
        })

    }

    HideCart() {
        this._c.showCart$.next(false)
    }

    DeleteItem(item: CartItem) {
        item.quantity = 0
        this._c.ModifyQuantityOfProduct(item)
            .then(_ => {
                this._m.add({
                    severity: 'success',
                    summary: 'Panier',
                    detail: 'Suppression de l\'objet réussie'
                })
            })
            .catch(err => {
                this._m.add({
                    severity: 'error',
                    summary: 'Panier',
                    detail: `Echec de la suppression de l\'objet: ${err.message}`
                })
            })
    }

    IncreaseQuantity(item: CartItem) {
        item.quantity += 1
        this._c.ModifyQuantityOfProduct(item)
            .then(_ => {
                this._m.add({
                    severity: 'success',
                    summary: 'Panier',
                    detail: 'Ajout d\'un objet réussi'
                })
            })
            .catch(err => {
                this._m.add({
                    severity: 'error',
                    summary: 'Panier',
                    detail: `Echec de l\'ajout d\'un objet: ${err.message}`
                })
            })
    }

    DecreaseQuantity(item: CartItem) {
        item.quantity -= 1
        this._c.ModifyQuantityOfProduct(item)
            .then(_ => {
                this._m.add({
                    severity: 'success',
                    summary: 'Panier',
                    detail: 'Suppression d\'un objet réussie'
                })
            })
            .catch(err => {
                this._m.add({
                    severity: 'error',
                    summary: 'Panier',
                    detail: `Echec de la suppression d\'un objet: ${err.message}`
                })
            })
    }

    CheckAvailableStock(item: CartItem): boolean {
        let product: Product | undefined = this._p.products$.value.find(product => product.id === item.id)
        if (product === undefined) return false
        return product.quantity >= item.quantity
    }

    CheckStockForItems(): boolean {
        return this.items.every(i => this.CheckAvailableStock(i))
    }

    TotalPrice(): number {
        return this.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    }

    ValidateCart() {
        console.log(this.cartForm.value)

        this.cartForm.markAsTouched()

        if (!this.cartForm.valid) return

        this._c.ValidateCart(this.cartForm.value.email)
            .then(_ => {
                this._m.add({
                    severity: 'success',
                    summary: 'Panier',
                    detail: 'Validation du panier réussie'
                })
            })
            .catch(err => {
                this._m.add({
                    severity: 'error',
                    summary: 'Panier',
                    detail: `Echec de la validation du panier: ${err.message}`
                })
            })
    }
}
