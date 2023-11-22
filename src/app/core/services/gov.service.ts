import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { firstValueFrom, of } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class GovService {
  cnpjUrl: string;
  linkHttp: HttpClient;

  constructor(private http: HttpClient, private httpBackend: HttpBackend) {
    this.linkHttp = new HttpClient(this.httpBackend);
    this.cnpjUrl = `${environment.apiURL}/cnpj`;
  }

  consultaCNPJ(cnpj: string) {
    // Nova variável "cnpj" somente com dígitos.
    cnpj = cnpj.replace(/\D/g, '');
    // Verifica se campo cnpj possui valor informado.
    if (cnpj !== '') {
      // Expressão regular para validar o CNPJ.
      const validacnpj = /^[0-9]{14}$/;
      // Valida o formato do CNPJ.
      if (validacnpj.test(cnpj)) {
        return this.http.get(`${this.cnpjUrl}/${cnpj}`);
      }
    }
    return of({});
  }

  consultaCEP(cep: string) {
    if (cep !== '') {
      const validacep = /^[0-9]{8}$/;
      if (validacep.test(cep)) {
        return this.http.get(`https://brasilapi.com.br/api/cep/v2/${cep}`);
      }
    }
    return of({});
  }

  getUf() {
    return firstValueFrom(this.http.get<any>('assets/dados/estados/uf.json'))
      .then((res) => res.uf as any[])
      .then((UF) => UF);
  }

  getCidades(value: string) {
    return firstValueFrom(this.linkHttp.get<any>(`assets/dados/estados/${value}.json`)).then(
      (res) => res.data as any[]
    );
  }

}
