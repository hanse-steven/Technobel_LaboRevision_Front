import {Component, Input, OnInit} from '@angular/core';
import {Button} from 'primeng/button'
import {TableModule} from 'primeng/table'
import {CurrencyPipe} from '@angular/common'
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
import {FormsModule} from '@angular/forms';

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
    ],
    templateUrl: './show-cart.component.html',
    styleUrl: './show-cart.component.scss'
})
export class ShowCartComponent {
    items: CartItem[] = []
    isVisible!: boolean

    constructor(
        private readonly _c: CartService,
        private readonly _m: MessageService,
    ) {
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

    TotalPrice(): number {
        return this.items.reduce((acc, item) => acc + item.price * item.quantity, 0)
    }
}
