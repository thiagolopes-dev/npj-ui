import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class CepValidations {


   cepValidator(control: FormControl) {

    const cep = control.value;
    if (cep && cep !== '') {
      const validacep = /^[0-9]{8}$/;
      return validacep.test(cep) ? null : { cepInvalido : true };
    }
    return null;
  }
}