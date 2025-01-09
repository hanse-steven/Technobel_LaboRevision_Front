import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import {environment} from '../../environments/environment'
import {CartItem} from '../Models/CartItem.model'
import {SignalRBase} from '../Utils/SignalRBase'
import {AddItemCart} from '../Models/AddCart.model'

@Injectable({
  providedIn: 'root'
})
export class CartService extends SignalRBase {
    cartItems$: BehaviorSubject<CartItem[]>
    showCart$: BehaviorSubject<boolean>

    constructor() {
        super(environment.cart)
        this.cartItems$ = new BehaviorSubject<CartItem[]>([])
        this.showCart$ = new BehaviorSubject<boolean>(false)

        this._hubConnection.on("GetCart", (data: CartItem[]) => {
            data.sort((a, b) => a.name.localeCompare(b.name))
            this.cartItems$.next(data)
        })
    }

    refresh(): void {
        this._hubConnection.invoke("GetCart").catch(err => console.error(err))
    }

    async addToCart(item: AddItemCart): Promise<boolean> {
        return this._hubConnection.invoke("AddToCart", item.id, item.quantity)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });

    }

    async ModifyQuantityOfProduct(item: AddItemCart): Promise<boolean> {
        return this._hubConnection.invoke("ModifyQuantityOfProduct", item.id, item.quantity)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    }

    async ValidateCart(email: string): Promise<boolean> {
        return this._hubConnection.invoke("ValidateCart", email)
            .then(() => {
                return true;
            })
            .catch(() => {
                return false;
            });
    }
}
