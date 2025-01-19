import { ResolveFn } from '@angular/router';
import {inject} from '@angular/core';
import {InvoiceService} from '../Services/invoice.service';
import {Observable} from 'rxjs';
import {Invoice} from '../Models/Invoice.model';

export const invoiceResolver: ResolveFn<Observable<Invoice>> = (route, state) => {
    const invoiceService = inject(InvoiceService)
    return invoiceService.getInvoices()
};
