import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environment/environment';

import * as moment from 'moment-timezone';
import { Varas } from 'src/app/core/models/varas.model';

@Injectable({
  providedIn: 'root',
})
export class VarasService {
  varaURL: string = '';

  constructor(private http: HttpClient) {
    this.varaURL = `${environment.apiURL}/varas`;
  }

  listarVaras(): Promise<Varas> {
    return firstValueFrom(this.http.get(`${this.varaURL}`)).then(
      (response) => response as Varas,
    );
  }

  adicionarVara(obj: Varas): Promise<Varas> {
    return firstValueFrom(this.http.post<Varas>(this.varaURL, obj));
  }

  atualizarVaras(obj: Varas): Promise<Varas> {
    return firstValueFrom(
      this.http.put<Varas>(`${this.varaURL}/${obj.id}`, obj),
    ).then((response) => response as Varas);
  }

  buscarPorID(id: string) {
    return firstValueFrom(this.http.get(`${this.varaURL}/${id}`)).then(
      (response) => response as Varas,
    );
  }

  excluir(id: string) {
    return firstValueFrom(this.http.delete(`${this.varaURL}/${id}`)).then(
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
