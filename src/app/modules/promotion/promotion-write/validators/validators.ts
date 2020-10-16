import { AbstractControl } from '@angular/forms';

export function reggex (control: AbstractControl) {
  if (!control.value.includes('ñ')) {
    return { reggex: true };
  }
  return null;
}
