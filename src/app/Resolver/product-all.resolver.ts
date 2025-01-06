import {ResolveFn} from '@angular/router';
import {Observable} from 'rxjs'
import {Product} from '../Models/Product.model'
import {ProductService} from '../Services/product.service'
import {inject} from '@angular/core'

export const productAllResolver: ResolveFn<Observable<Product[]>> = (route, state) => {
    const productService: ProductService = inject(ProductService)
    return productService.findAll()
}
