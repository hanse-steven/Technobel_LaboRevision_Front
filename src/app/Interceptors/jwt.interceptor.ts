import { HttpInterceptorFn } from '@angular/common/http'
import {AuthService} from '../Services/auth.service';
import {inject} from '@angular/core';
import {User} from '../Models/User.model';
import {catchError, throwError} from 'rxjs';

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {
    const authService: AuthService = inject(AuthService)
    let userToken: User | undefined = authService.currentUser$.value
    if (userToken) {
        let token = userToken.token

        if (token && token !== '') {
            let requestClone = req.clone({
                headers: req.headers.append('Authorization', 'Bearer ' + token)
            })
            return next(requestClone).pipe(catchError(err => {
                if (err.status === 401) {
                    authService.logout()
                }
                return throwError(err)
            }))
        }
    }
    return next(req)
}
