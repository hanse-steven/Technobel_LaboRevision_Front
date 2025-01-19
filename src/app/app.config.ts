import {DEFAULT_CURRENCY_CODE, LOCALE_ID} from '@angular/core';
import {ApplicationConfig, provideZoneChangeDetection} from '@angular/core';
import {provideRouter} from '@angular/router';
import {routes} from './app.routes';

import {provideAnimationsAsync} from '@angular/platform-browser/animations/async'
import {providePrimeNG} from 'primeng/config'
import Aura from '@primeng/themes/lara'
import {provideHttpClient, withInterceptors} from '@angular/common/http'
import {jwtInterceptor} from './Interceptors/jwt.interceptor';

import {registerLocaleData} from "@angular/common";
import localeFrBe from '@angular/common/locales/fr-BE';

registerLocaleData(localeFrBe)

export const appConfig: ApplicationConfig = {
    providers: [
        {provide: LOCALE_ID, useValue: 'fr-BE'},
        {provide: DEFAULT_CURRENCY_CODE, useValue: 'EUR'},
        provideZoneChangeDetection({eventCoalescing: true}),
        provideRouter(routes),
        provideHttpClient(
            withInterceptors([
                jwtInterceptor
            ])
        ),
        provideAnimationsAsync(),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    cssLayer: {
                        name: 'primeng',
                        order: 'tailwind-base, primeng, tailwind-utilities'
                    }
                }
            },
        })
    ]
};
