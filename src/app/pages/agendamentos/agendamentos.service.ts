import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Agendamento } from 'src/app/core/models/agendamento.model';
import { environment } from 'src/environment/environment';

import * as moment from 'moment-timezone';

@Injectable({
  providedIn: 'root',
})
export class AgendamentosService {
  agendamentoURL: string = '';

  constructor(private http: HttpClient) {
    this.agendamentoURL = `${environment.apiURL}/agendamentos`;
  }

  listarAgendamentos(): Promise<Agendamento> {
    return firstValueFrom(this.http.get(`${this.agendamentoURL}`)).then(
      (response) => response as Agendamento,
    );
  }

  adicionarAgendamento(obj: Agendamento): Promise<Agendamento> {
    return firstValueFrom(this.http.post<Agendamento>(this.agendamentoURL, obj));
  }

  atualizarAgendamentos(obj: Agendamento): Promise<Agendamento> {
    return firstValueFrom(
      this.http.put<Agendamento>(`${this.agendamentoURL}/${obj._id}`, obj),
    ).then((response) => response as Agendamento);
  }

  buscarPorID(id: string) {
    return firstValueFrom(this.http.get(`${this.agendamentoURL}/${id}`)).then(
      (response) => {
        response as Agendamento;
        this.converteStringParaData(response);
        return response;
      } 
    );
  }

  excluir(id: string) {
    return firstValueFrom(this.http.delete(`${this.agendamentoURL}/${id}`)).then(
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

  converteStringParaData(obj: any) {
      obj.dataatendimento = moment(obj.dataatendimento, 'YYYY/MM/DD H:mm')
        .tz('America/Sao_Paulo')
        .toDate();
 
  }
}