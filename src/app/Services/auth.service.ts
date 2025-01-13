import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {User} from '../Models/User.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {UserAuthFormModel} from '../Models/UserAuthFormModel';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    currentUser$: BehaviorSubject<User | undefined>

    constructor(
        private readonly _http: HttpClient,
        private readonly _router: Router,
        //private readonly _m: MessageService
    ) {
        let jsonUser = localStorage.getItem('currentUser')
        this.currentUser$ = new BehaviorSubject<User | undefined>(
            jsonUser ? JSON.parse(jsonUser) : undefined
        )
    }

    register(form: UserAuthFormModel): Observable<User> {
        return this._http.post<User>('/api/auth/register', form).pipe(
            tap(_ => {
                // this._m.add({
                //     severity: 'success',
                //     summary: 'Authentification',
                //     detail: 'Création du compte réussie'
                // })
            })
        )
    }

    login(form: UserAuthFormModel): Observable<User> {
        return this._http.post<User>('/api/auth/login', form).pipe(
            tap(u => {
                this.currentUser$.next(u)
                localStorage.setItem('currentUser', JSON.stringify(u))
                // this._m.add({
                //     severity: 'success',
                //     summary: 'Authentification',
                //     detail: 'Connexion réussie'
                // })
            })
        )
    }

    logout(): void {
        localStorage.removeItem('currentUser')
        this.currentUser$.next(undefined)
        // this._m.add({
        //     severity: 'success',
        //     summary: 'Authentification',
        //     detail: 'Déconnexion réussie'
        // })
        this._router.navigate(["/auth/login"])
    }
}
