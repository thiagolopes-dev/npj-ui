import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environment/environment';

import * as moment from 'moment-timezone';
import { Acompanhamentos } from 'src/app/core/models/acompanhamentos.model';

@Injectable({
  providedIn: 'root',
})
export class AcompanhamentosService {
  acompanhamentoURL: string = '';

  constructor(private http: HttpClient) {
    this.acompanhamentoURL = `${environment.apiURL}/acompanhamentos`;
  }

  listarAcompanhamentos(): Promise<Acompanhamentos> {
    return firstValueFrom(this.http.get(`${this.acompanhamentoURL}`)).then(
      (response) => response as Acompanhamentos,
    );
  }

  adicionarAcompanhamentos(obj: Acompanhamentos): Promise<Acompanhamentos> {
    return firstValueFrom(this.http.post<Acompanhamentos>(this.acompanhamentoURL, obj));
  }

  atualizarAcompanhamentos(obj: Acompanhamentos): Promise<Acompanhamentos> {
    return firstValueFrom(
      this.http.put<Acompanhamentos>(`${this.acompanhamentoURL}/${obj._id}`, obj),
    ).then((response) => response as Acompanhamentos);
  }

  buscarPorID(id: string) {
    return firstValueFrom(this.http.get(`${this.acompanhamentoURL}/${id}`)).then(
      (response) => response as Acompanhamentos,
    );
  }

  excluir(id: string) {
    return firstValueFrom(this.http.delete(`${this.acompanhamentoURL}/${id}`)).then(
      () => null,
    );
  }

  converteStringParaDatas(obj: any) {
    obj.forEach((element: any) => {
      element.datagravacao = moment(element.datagravacao, 'YYYY/MM/DD H:mm')
        .tz('America/Sao_Paulo')
        .toDate();
    });
  }
}