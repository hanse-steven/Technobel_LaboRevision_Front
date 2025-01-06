import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {BehaviorSubject, Observable} from 'rxjs'
import {environment} from '../../environments/environment'
import {CartItem} from '../Models/CartItem.model'
import {AddItemCart} from '../Models/AddCart.model'
import {HubConnection, HubConnectionBuilder} from '@microsoft/signalr'

@Injectable({
  providedIn: 'root'
})
export class CartService {
    private _hubConnection!: HubConnection
    cartItems$: BehaviorSubject<CartItem[]>

    constructor(
        private readonly _http: HttpClient,

    ) {
        this.cartItems$ = new BehaviorSubject<CartItem[]>([])
        this.GetFromAPI().subscribe(
            value => this.cartItems$.next(value)
        )

        const hubBuilder: HubConnectionBuilder = new HubConnectionBuilder()
        this._hubConnection = hubBuilder
            .withUrl(environment.cart_websocket)
            .withAutomaticReconnect()
            .build()

        this._hubConnection.start().then(r => console.log("Connexion SignalR établie"))

        this._hubConnection.on('CartUpdated', (data: CartItem[]) => {
            console.log("Actualisation des données")
            this.cartItems$.next(data)
        })
    }

    Get(): CartItem[] {
        return this.cartItems$.value
    }

    private GetFromAPI(): Observable<CartItem[]> {
        return this._http.get<CartItem[]>(environment.cart)
    }

    AddToCart(item: AddItemCart): Observable<string> {
        return this._http.post<string>(environment.cart,item)
    }
}
