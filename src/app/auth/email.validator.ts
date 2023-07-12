import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { UserService } from '../services/user.service';

export function EmailValidator(userService: UserService): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const email = control.value;
        userService.getUserByEmail(email).subscribe((response: any) => {
            if (response?.body?.success) {
                console.log('email error');
                return { uniqueEmailError: true };
            } else return null;
        });
        return null;
    };
}
