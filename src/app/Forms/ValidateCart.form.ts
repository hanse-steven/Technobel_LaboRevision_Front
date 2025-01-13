import {Validators} from '@angular/forms';

export const ValidateCartForm = {
    email: [null, [Validators.required, Validators.email]],
}
