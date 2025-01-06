import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Button} from "primeng/button"
import {CurrencyPipe, NgClass, NgForOf} from "@angular/common"
import {DataView} from "primeng/dataview"
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms"
import {Select} from "primeng/select"
import {Tag} from "primeng/tag"
import {Product} from '../../Models/Product.model'
import {AddItemCart} from '../../Models/AddCart.model'

@Component({
    selector: 'app-show-products',
    imports: [
        Button,
        CurrencyPipe,
        DataView,
        NgForOf,
        ReactiveFormsModule,
        Select,
        Tag,
        NgClass,
    ],
    templateUrl: './show-products.component.html',
    styleUrl: './show-products.component.scss'
})
export class ShowProductsComponent implements OnInit{
    @Input() products: Product[] = []
    @Output() addToCart = new EventEmitter<AddItemCart>

    productForms: FormGroup[] = []

    constructor(
        private readonly _fb: FormBuilder
    ) {}

    ngOnInit(): void {
        this.products.forEach(p => {
            const form = this._fb.group({
                id: [p.id, Validators.required],
                quantity: [p.quantity > 0 ? 1 : null, [Validators.required, Validators.min(1), Validators.max(p.quantity)]]
            })
            this.productForms.push(form)
        })
    }

    getQuantityOptions(quantity: any) {
        return Array.from({length: quantity}, (_, i) => ({label: `${i + 1}`, value: i + 1}))
    }

    submit(index: number): void {
        if (this.productForms[index].invalid) {
            this.productForms[index].markAllAsTouched()
            return
        }
        this.addToCart.emit(this.productForms[index].value)
    }
}
