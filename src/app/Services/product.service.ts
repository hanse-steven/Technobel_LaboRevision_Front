import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs'
import {Product} from '../Models/Product.model'
import {environment} from '../../environments/environment'
import {SignalRBase} from '../Utils/SignalRBase'

@Injectable({
    providedIn: 'root'
})
export class ProductService extends SignalRBase{
    products$: BehaviorSubject<Product[]>

    constructor() {
        super(environment.product)
        this.products$ = new BehaviorSubject<Product[]>([])

        this._hubConnection.on("GetProducts", (data: Product[]) => {
            this.products$.next(data)
        })
    }

    refresh(): void {
        this._hubConnection.invoke("GetProducts").catch(err => console.error(err))
    }
}
