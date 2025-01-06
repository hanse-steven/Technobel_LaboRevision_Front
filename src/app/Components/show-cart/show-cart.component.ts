import {Component, Input, OnInit} from '@angular/core';
import {Button} from 'primeng/button'
import {TableModule} from 'primeng/table'
import {CurrencyPipe} from '@angular/common'
import {Rating} from 'primeng/rating'
import {Tag} from 'primeng/tag'
import {CartItem} from '../../Models/CartItem.model'

@Component({
    selector: 'app-show-cart',
    imports: [
        Button,
        TableModule,
        CurrencyPipe,
        Rating,
        Tag
    ],
    templateUrl: './show-cart.component.html',
    styleUrl: './show-cart.component.scss'
})
export class ShowCartComponent implements OnInit{
    @Input() items: CartItem[] = []

    ngOnInit(): void {


    }
}
