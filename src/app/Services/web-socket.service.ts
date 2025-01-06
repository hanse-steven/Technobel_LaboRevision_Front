import {Injectable} from '@angular/core';
import {WebSocketSubject} from 'rxjs/internal/observable/dom/WebSocketSubject'
import {webSocket} from 'rxjs/webSocket'
import {environment} from '../../environments/environment'
import {Observable} from 'rxjs'

@Injectable({
    providedIn: 'root'
})
export class WebSocketService {
    private socket$: WebSocketSubject<any>

    constructor() {
        this.socket$ = webSocket(environment.websocket)
    }

    getMessages(): Observable<any> {
        return this.socket$.asObservable()
    }
}
