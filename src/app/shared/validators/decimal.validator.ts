import { AbstractControl } from "@angular/forms";

export function decimalValidator(
  control: AbstractControl
): { [key: string]: boolean | null } {
  const regEx = /^\d+(\.\d{1,2})?$/g;

  if (control.value !== undefined && !regEx.test(control.value)) {
    return { isValidDecimal: true };
  }
  return null;
}
