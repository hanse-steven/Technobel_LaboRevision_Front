import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {Observable} from 'rxjs'
import {Product} from '../Models/Product.model'
import {environment} from '../../environments/environment'

@Injectable({
    providedIn: 'root'
})
export class ProductService {

    constructor(
        private readonly _http: HttpClient
    ) {
    }

    findAll(): Observable<Product[]> {
        return this._http.get<Product[]>(environment.product)
    }
}
