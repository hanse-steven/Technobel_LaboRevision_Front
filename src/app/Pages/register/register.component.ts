import { Component } from '@angular/core';
import {ButtonDirective, ButtonLabel} from 'primeng/button';
import {Divider} from 'primeng/divider';
import {FloatLabel} from 'primeng/floatlabel';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {InputText} from 'primeng/inputtext';
import {Router, RouterLink} from '@angular/router';
import {AuthService} from '../../Services/auth.service';

@Component({
  selector: 'app-register',
    imports: [
        ButtonDirective,
        ButtonLabel,
        Divider,
        FloatLabel,
        FormsModule,
        InputText,
        ReactiveFormsModule,
        RouterLink
    ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
    registerForm: FormGroup

    constructor(
        private readonly _router: Router,
        private readonly _auth: AuthService,
        private readonly _fb: FormBuilder,
    ) {
        this.registerForm = this._fb.group({
            email: [null, [Validators.required, Validators.email]],
            password: [null, [Validators.required, Validators.minLength(2)]],
            confirmPassword: [null, [Validators.required, Validators.minLength(2)]]
        })
    }

    submit(): void {
        this.registerForm.markAsTouched()

        if (!this.registerForm.valid) return

        this._auth.register(this.registerForm.value).subscribe({
            next: _ => {
                this._router.navigate(['/login'])
            },
            error: err => {
                console.error(err)
            }
        })
    }
}
