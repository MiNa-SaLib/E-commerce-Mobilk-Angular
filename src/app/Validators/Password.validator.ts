import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordMatch(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let password = control.get('password');
    let ConfirmPassword = control.get('ConfirmPassword');
    if (
      !password ||
      !ConfirmPassword ||
      !password.value ||
      !ConfirmPassword.value
    )
      return null;
    let passValidator = { notMatch: true };
    return password.value == ConfirmPassword.value ? null : passValidator;
  };
}
