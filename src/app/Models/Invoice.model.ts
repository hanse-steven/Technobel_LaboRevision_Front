import {Product} from './Product.model';

export interface Invoice {
    invoiceId: number
    invoiceDate: Date
    products: Product[]
}
