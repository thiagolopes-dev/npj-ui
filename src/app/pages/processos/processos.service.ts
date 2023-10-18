import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { environment } from 'src/environment/environment';

import * as moment from 'moment-timezone';
import { Processos } from 'src/app/core/models/processo.model';

@Injectable({
  providedIn: 'root',
})
export class ProcessosService {
  processoURL: string = '';

  constructor(private http: HttpClient) {
    this.processoURL = `${environment.apiURL}/processos`;
  }

  listarProcessos(): Promise<Processos> {
    return firstValueFrom(this.http.get(`${this.processoURL}`)).then(
      (response) => response as Processos,
    );
  }

  adicionarProcessos(obj: Processos): Promise<Processos> {
    return firstValueFrom(this.http.post<Processos>(this.processoURL, obj));
  }

  atualizarProcessos(obj: Processos): Promise<Processos> {
    return firstValueFrom(
      this.http.put<Processos>(`${this.processoURL}/${obj._id}`, obj),
    ).then((response) => response as Processos);
  }

  buscarPorID(id: string) {
    return firstValueFrom(this.http.get(`${this.processoURL}/${id}`)).then(
      (response) => response as Processos,
    );
  }

  excluir(id: string) {
    return firstValueFrom(this.http.delete(`${this.processoURL}/${id}`)).then(
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
