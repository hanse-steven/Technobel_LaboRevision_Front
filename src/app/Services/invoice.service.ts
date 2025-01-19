import {Injectable, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';
import {Invoice} from '../Models/Invoice.model';
import {ActivatedRoute} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class InvoiceService {
    invoices: Invoice[] = []

    constructor(
        private readonly _http: HttpClient,
    ) {}

    getInvoices(): Observable<Invoice> {
        return this._http.get<Invoice>(environment.invoice)
    }
}
