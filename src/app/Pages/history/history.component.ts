import {Component, OnInit} from '@angular/core';
import {TableModule} from 'primeng/table';
import {ActivatedRoute} from '@angular/router';
import {Invoice} from '../../Models/Invoice.model';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'app-history',
    imports: [
        TableModule,
        DatePipe,
        CurrencyPipe
    ],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss'
})
export class HistoryComponent implements OnInit{
    invoices: Invoice[] = []

    constructor(
       private readonly _ar: ActivatedRoute
    ) {}

    ngOnInit() {
        this._ar.data.subscribe((data:any) => {
            this.invoices = data.invoice;
            console.log(this.invoices)
        });
    }

    getTotal(invoice: Invoice): number {
        return invoice.products.reduce((t, p) => t + p.price * p.quantity, 0);
    }
}
