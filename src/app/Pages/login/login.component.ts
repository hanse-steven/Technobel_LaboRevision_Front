import {Component} from '@angular/core';
import {InputText} from 'primeng/inputtext';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {Divider} from 'primeng/divider';
import {FloatLabel} from 'primeng/floatlabel';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthService} from '../../Services/auth.service';
import {Router, RouterLink} from '@angular/router';

@Component({
    selector: 'app-login',
    imports: [
        InputText,
        FloatLabel,
        FormsModule,
        ReactiveFormsModule,
        ButtonDirective,
        ButtonLabel,
        Divider,
        RouterLink
    ],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss'
})
export class LoginComponent {
    loginForm: FormGroup

    constructor(
        private readonly _router: Router,
        private readonly _auth: AuthService,
        private readonly _fb: FormBuilder,
    ) {
        this.loginForm = this._fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(2)]]
        })
    }

    submit(): void {
        this.loginForm.markAsTouched()

        if (!this.loginForm.valid) return

        this._auth.login(this.loginForm.value).subscribe({
            next: _ => {
                this._router.navigate(['/'])
            },
            error: err => {
                console.error(err)
            }
        })
    }

}
