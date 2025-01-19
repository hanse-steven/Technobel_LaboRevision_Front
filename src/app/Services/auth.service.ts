import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable, tap} from 'rxjs';
import {User} from '../Models/User.model';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {MessageService} from 'primeng/api';
import {UserAuthFormModel} from '../Models/UserAuthFormModel';
import {environment} from '../../environments/environment';
import {jwtDecode} from 'jwt-decode';
import {JwtPayload} from '../Models/JwtPayload.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    currentUser$: BehaviorSubject<User | undefined>

    constructor(
        private readonly _http: HttpClient,
        private readonly _router: Router,
    ) {
        let jsonUser = localStorage.getItem('currentUser')
        this.currentUser$ = new BehaviorSubject<User | undefined>(
            jsonUser ? JSON.parse(jsonUser) : undefined
        )
    }

    login(form: UserAuthFormModel): Observable<User> {
        return this._http.post<User>(environment.auth + 'login', form).pipe(
            tap(u => {
                this.currentUser$.next(u)
                localStorage.setItem('currentUser', JSON.stringify(u))
            })
        )
    }

    register(form: UserAuthFormModel): Observable<any> {
        return this._http.post(environment.auth + 'register', form).pipe(
            tap(_ => {
                this._router.navigate(['/login'])
            })
        )
    }

    logout(): void {
        localStorage.removeItem('currentUser')
        this.currentUser$.next(undefined)
        this._router.navigate(["/"])
    }

    getTokenData(): JwtPayload | undefined {
        if (this.currentUser$.value?.token) {
            return jwtDecode<JwtPayload>(this.currentUser$.value.token)
        }
        return undefined
    }
}
